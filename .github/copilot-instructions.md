# Files-Fy: Instruções para Agentes AI

## 🎯 Visão Geral da Arquitetura

**Files-Fy** é uma aplicação desktop Electron + Node.js para recuperação de arquivos com sistema de autenticação OAuth e pagamentos integrados. Funciona em dois processos:

1. **Electron Frontend** (`electron/`, `src/`) - Desktop UI
2. **Express Backend** (`backend/`) - APIs, autenticação, pagamentos

### Fluxo de Dados Principal

```
[Electron App] 
  ↓ IPC & HTTP
[Express Server] (localhost:3001)
  ↓
[PostgreSQL Database]
[Google OAuth] [Stripe API]
```

## 📁 Estrutura Crítica

- **`backend/server.js`** - Entrada do servidor Express (porta 3001, CORS habilitado)
- **`backend/routes/auth.js`** - Rotas: `/login-google`, `/verify`, `/logout`, `/test-login`
- **`backend/controllers/`** - Lógica de negócio (Auth, Payment, Subscription)
- **`backend/models/`** - Queries SQL diretas (User, Subscription, Session, Transaction)
- **`backend/config/database.js`** - Pool PostgreSQL configurado por `.env`
- **`electron/main.js`** - Janela Electron (BrowserWindow) e menu
- **`electron/preload.js`** - Segurança (context isolation)
- **`src/renderer.js`** - Aplicação principal (1067 linhas, todo estado no DOM)
- **`src/index.html`** - Wizard multi-step
- **`package.json`** - Scripts: `npm run dev` executa `server:dev` + `electron:dev` concorrentemente

## 🔐 Sistema de Autenticação

### Fluxo OAuth
1. Frontend coleta token Google ID
2. POST `/api/auth/login-google` com `{token, refreshToken}`
3. Backend valida token com `google-auth-library`
4. Cria/atualiza `User` → cria `Subscription` (padrão FREE)
5. Gera JWT e salva `Session` (validade 7 dias)
6. Retorna `{user, subscription, jwtToken}`

### Endpoints Auth
- **POST `/api/auth/login-google`** - Autenticação principal (requer `GOOGLE_CLIENT_ID` configurado)
- **POST `/api/auth/test-login`** - Fallback sem credenciais (desenvolvimento)
- **POST `/api/auth/verify`** - Valida JWT
- **POST `/api/auth/logout`** - Invalida sessão

**Padrão crítico**: Novos usuários recebem `Subscription` FREE automaticamente.

## 💳 Sistema de Pagamento (Stripe)

### Modelos de Preço
- **FREE** - Grátis eternamente (3 scans/mês, 100MB limite, 5 arquivos máx)
- **PRO** - R$ 9,99/mês (37% desconto primeiro mês), ilimitado

### Fluxo de Pagamento
1. Frontend coleta método (`pix`, `credit_card`, `debit_card`)
2. POST `/api/payments/create-payment-intent` com `{userId, planType, paymentMethod}`
3. Backend cria `PaymentIntent` Stripe
4. Webhook `/api/payments/webhook` atualiza `Subscription.plan_type = 'PRO'`
5. Cria `Transaction` record com status

**Validações**:
- Apenas plano PRO permite pagamento (FREE = amount 0, rejeitado)
- Stripe Secret Key obrigatório para pagamentos reais

## 🗄️ Modelos de Dados

### User
```javascript
// Fields: id, google_id, email, name, avatar_url, created_at, updated_at
User.findByGoogleId(googleId) // Busca por Google ID
User.findByEmail(email)        // Alternativa para test-login
User.create(googleId, email, name, avatarUrl)
User.update(id, {field: value})
```

### Subscription
```javascript
// Fields: id, user_id, plan_type ('FREE'|'PRO'), created_at, updated_at
Subscription.create(userId, 'FREE') // Padrão no register
Subscription.findByUserId(userId)
Subscription.updatePlan(userId, 'PRO') // Após pagamento bem-sucedido
```

### Session
```javascript
// Rastreia JWTs válidos (7 dias validade)
Session.create(userId, jwtToken, refreshToken, expiresAt)
Session.findByToken(token)
Session.invalidate(token) // Logout
```

### Transaction
```javascript
// Log de pagamentos (criado por webhook Stripe)
// Fields: id, user_id, stripe_intent_id, amount_brl, status, metadata
```

## ⚙️ Configuração Obrigatória (.env)

```env
# Google OAuth (CRÍTICO - veja CONFIGURACAO_GOOGLE_OAUTH.md)
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# Database (padrão: localhost, filesfy_db)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=filesfy_db
DB_USER=postgres
DB_PASSWORD=xxx

# Stripe (obrigatório para pagamentos)
STRIPE_SECRET_KEY=sk_xxx

# App
JWT_SECRET=xxx
JWT_EXPIRATION=24h
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 🔧 Fluxos de Desenvolvimento

### Iniciar aplicação
```bash
npm install                # Instala ambos (frontend + backend deps)
npm run dev               # Executa Express + Electron concorrentemente
npm run server:dev        # Só backend (porta 3001)
npm run electron:dev      # Só frontend (IPC para localhost:3001)
```

### Debugging
- **Backend**: Logar em `server.js` - output no terminal
- **Frontend**: DevTools (`Ctrl+Shift+I` no Electron, ou `mainWindow.webContents.openDevTools()`)
- **IPC**: Electron <→ Renderer via `window.electron.invoke()`

### Modificações Comuns
1. **Adicionar rota API**: 1) Criar controller em `backend/controllers/`, 2) Adicionar rota em `backend/routes/`, 3) Registrar em `backend/server.js`
2. **Adicionar campo User**: 1) Migration SQL em `backend/migrations/`, 2) Atualizar `User.js` query
3. **Novo plano de preço**: Atualizar `PLANS` em `renderer.js` + `PaymentController.js` lógica de valor

## 🎨 Convenções do Projeto

- **Nomes de classe SQL**: snake_case direto nas queries (ex: `plan_type`, `google_id`)
- **Retornos de erro**: `{error: 'mensagem'}` em Português
- **Respostas sucesso**: `{success: true, data: {...}}` ou direto dados
- **Middleware**: Não há middleware de autenticação global - cada rota valida JWT se necessário
- **Async/Await**: Padrão em controllers (try/catch com res.status())

## 📦 Dependências Chave

- **electron** - Desktop UI
- **express** - Backend API
- **pg** - PostgreSQL client
- **google-auth-library** - Validação OAuth tokens
- **jsonwebtoken** - JWT sessions
- **stripe** - Integração pagamentos
- **dotenv** - Variáveis ambiente
- **cors** - Cross-origin requests (Electron → Express)

## 🔄 Workflow de Recuperação de Arquivos

### Fluxo UX (5 passos em `renderer.js`)

1. **Planos** → Escolher FREE ou PRO (triggera autenticação se PRO)
2. **Dispositivo** → Selecionar disco (mock data em dev)
3. **Tipo de Arquivo** → Filtrar extensões (image, video, audio, document, archive)
4. **Resultados** → Listar arquivos encontrados, selecionar quais recuperar
5. **Recuperação** → Progress bar simulado, exibe sucesso

### Restrições por Plano
- **FREE**: Máximo 5 arquivos recuperáveis (limitado em `renderResults()`)
- **PRO**: Todos os arquivos desbloqueados (`.canRecover = true`)
- Lógica: `if (selectedPlan === 'FREE') { scanResults = scanResults.slice(0, 5); }`

### Atualizações de DOM

O `renderer.js` segue padrão de **rendering imediato** (sem framework):
- Cria HTML string com template literals
- Define `wizardEl.innerHTML = html`
- **Importante**: Adiciona listeners APÓS renderização (com `setTimeout()` se necessário)
- Problema comum: listeners anexados antes do DOM estar pronto

Exemplo padrão:
```javascript
wizardEl.innerHTML = `<div class="device-card">...</div>`;

setTimeout(() => {
  const cards = document.querySelectorAll('.device-card');
  cards.forEach(card => {
    card.addEventListener('click', handleSelection); // ✓ Correto
  });
}, 200);
```

### Gerenciamento de Estado

Estado armazenado em **variáveis globais** (não localStorage):
- `currentUser` - Objeto user desde `/login-google`
- `userSubscription` - Plan type (FREE/PRO)
- `selectedPlan` - Plano selecionado na UI
- `selectedFiles` - Array de IDs de arquivos selecionados
- `scanResults` - Mock data de arquivos encontrados
- `currentStep` - Qual step (0-5) está sendo exibido

**Persiste apenas**: `auth_token` e `user_data` em localStorage (em `auth.js`)

## 🐛 Debugging e DevTools

### Backend (Express)
```bash
npm run server:dev  # Log direto no terminal
# Adicionar console.log em controllers/routes
```

### Frontend (Electron)
```javascript
// Em electron/main.js, descommentar:
mainWindow.webContents.openDevTools();

// Ou pressionar Ctrl+Shift+I em tempo de execução
```

### Verificar comunicação HTTP
- Network tab do DevTools mostra chamadas para `http://localhost:3001/api`
- Todos os requests incluem header `Authorization: Bearer {token}`

### Logs úteis
```javascript
console.log('🔧 [RENDERER] Current step:', currentStep);
console.log('📱 [DOM] Cards encontrados:', cards.length);
console.error('❌ [API] Erro:', error.message);
```

## 🧩 Padrões Específicos do Projeto

### 1. Spinner/Progress com Intervalo
```javascript
let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress > 100) progress = 100;
  
  document.querySelector('.progress-fill').style.width = progress + '%';
  
  if (progress >= 100) {
    clearInterval(interval);
    setTimeout(nextFunction, 800); // Delay para visualizar 100%
  }
}, 400);
```

### 2. Cards com Data Attributes
```html
<div class="device-card" data-device-id="${device.id}">
```
Recuperar: `const deviceId = card.dataset.deviceId;`

### 3. Template Literals com .map()
```javascript
// Renderizar lista dinamicamente
${scanResults.map(file => `
  <div class="result-item" data-file-id="${file.id}">
    ${file.name}
  </div>
`).join('')}
```

### 4. Event Delegation (Não usado aqui)
Projeto usa listeners diretos, não delegados. Remonta DOM frequentemente então listeners precisam ser refeitos.

## ⚠️ Armadilhas Comuns

1. **Google OAuth não configurado**: Erro 400 em `/login-google` se `GOOGLE_CLIENT_ID` vazio. Use `/test-login` para desenvolvimento.
2. **JWT expirado**: Session válida 7 dias. Verificar `Session.findByToken()` no verify.
3. **CORS origem**: Express espera `FRONTEND_URL` do `.env`. Electron localhost padrão é `http://localhost:3000`.
4. **Pool PostgreSQL**: Erro fatal se não conectar - aplicação encerra processo. Verificar credenciais `.env`.
5. **Stripe webhook**: Requer rota POST sem autenticação JWT (público). Validar signature com `stripe.webhooks.constructEvent()`.
6. **Listeners não encontram elementos**: Se adicionar listener antes de `setTimeout()`, elementos não estarão no DOM. Sempre usar delay ou adicionar após renderização confirmada.
7. **Estado não persiste**: Variáveis globais são resetadas quando `wizardEl.innerHTML` é substituído. Usar `currentUser` + localStorage apenas para dados que precisam sobreviver reload.

## 📖 Referências Internas

- [CONFIGURACAO_GOOGLE_OAUTH.md](../CONFIGURACAO_GOOGLE_OAUTH.md) - Setup completo OAuth
- [README.md](../README.md) - Features e requisitos
- [backend/migrations/001_create_tables.sql](../backend/migrations/001_create_tables.sql) - Schema
- [src/renderer.js](../src/renderer.js) - UI principale (1067 linhas, todo estado em variáveis globais)
- [src/api.js](../src/api.js) - Cliente HTTP com Bearer token
- [backend/controllers/SubscriptionController.js](../backend/controllers/SubscriptionController.js) - Lógica de upgrade/downgrade
