# Filesfy - Recuperação de Dados

Aplicação desktop Electron para recuperação de arquivos deletados com autenticação OAuth e sistema de pagamentos.

## 🚀 Início Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Inicializar banco de dados
psql -U postgres -d filesfy_db -f backend/migrations/001_create_tables.sql

# 3. Inserir planos
psql -U postgres -d filesfy_db -c "INSERT INTO plano (nome, limite_restauracoes, valor, ativo) VALUES ('FREE', 5, 0.00, true), ('PRO', NULL, 29.90, true) ON CONFLICT (nome) DO NOTHING;"

# 4. Iniciar aplicação
npm start
```

## ⚙️ Configuração

Crie `.env` na raiz com as credenciais do PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=filesfy_db
DB_USER=postgres
DB_PASSWORD=sua_senha

JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRATION=7d

STRIPE_SECRET_KEY=sk_test_xxx

PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 📁 Estrutura do Projeto

```
backend/              # Express API (porta 3001)
  ├── server.js       # Servidor principal
  ├── config/         # Configuração (database)
  ├── controllers/    # Lógica de negócio
  ├── models/         # Queries SQL
  ├── routes/         # Endpoints
  └── migrations/     # Schema SQL

electron/            # Electron main process
src/                 # Frontend UI
  ├── index.html      # Interface principal
  ├── renderer.js     # Lógica da aplicação
  ├── api.js          # Cliente HTTP
  ├── auth.js         # Autenticação
  └── styles.css      # Estilos
```

## ✨ Funcionalidades

- ✅ Recuperação de arquivos (Imagens, Vídeos, Documentos, Áudio)
- ✅ Autenticação Google OAuth + Modo Teste
- ✅ Planos FREE (5 arquivos) e PRO (ilimitado)
- ✅ Pagamentos com Stripe (PIX, Crédito, Débito)
- ✅ Acessibilidade (Zoom, Alto Contraste, Leitura por Voz)

## 🔐 Autenticação

- **Teste local**: Clique em "Continuar em Modo Teste"
- **Google OAuth**: Configure em `.env` com credenciais do Google Cloud Console

## 💳 Planos

| Recurso | FREE | PRO |
|---------|------|-----|
| Varreduras/mês | 3 | 3 |
| Limite/varredura | 100MB | 100MB |
| Arquivos | 5 max | Ilimitado |
| Preço | Grátis | R$ 29,90/mês |

## 📜 Licença

MIT © 2026 Filesfy Inc.

