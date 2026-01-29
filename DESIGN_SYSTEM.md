# 🎨 Filesfy - Design System

Documentação completa do design da aplicação **Files-Fy** para prototipagem no Figma.

---

## 📋 Índice

1. [Paleta de Cores](#paleta-de-cores)
2. [Tipografia](#tipografia)
3. [Grid e Espaçamento](#grid-e-espaçamento)
4. [Componentes](#componentes)
5. [Telas](#telas)
6. [Fluxos e Interações](#fluxos-e-interações)

---

## 🎨 Paleta de Cores

### Cores Principais

| Cor | Hex | Uso |
|-----|-----|-----|
| **Verde Primário** | `#22c55e` | CTA, Hover, Ênfase |
| **Verde Escuro** | `#16a34a` | Gradiente, Hover intenso |
| **Vermelho Alert** | `#ef4444` | Logout, Erros |
| **Vermelho Escuro** | `#dc2626` | Hover Logout |
| **Amarelo Warning** | `#fbbf24` | Avisos, Notificações |

### Cores Neutras

| Tom | Hex | Uso |
|-----|-----|-----|
| **Preto Muito Escuro** | `#020617` | Footer, Fundo básico |
| **Preto Escuro** | `#0b1324` | Painéis |
| **Preto** | `#0f172a` | Fundo gradiente |
| **Cinza Escuro** | `#111827` | Botões secundários |
| **Cinza Médio Escuro** | `#1f2937` | Bordas, Divisores |
| **Cinza Médio** | `#2d3748` | Estados hover |
| **Cinza Claro** | `#374151` | Botões terciários |
| **Cinza Muito Claro** | `#9ca3af` | Texto secundário |
| **Cinza Claro Texto** | `#d1d5db` | Texto primário |
| **Branco Quase** | `#e5e7eb` | Texto principal |
| **Branco Puro** | `#ffffff` | Contraste máximo |

### Gradientes

```
Fundo Principal: linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
Header: linear-gradient(180deg, rgba(2, 6, 23, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)
Logo: linear-gradient(135deg, #22c55e 0%, #16a34a 100%)
Botão Primário: linear-gradient(135deg, #ef4444 0%, #dc2626 100%)
Card Plan: linear-gradient(135deg, #1f2937 0%, #111827 100%)
Hover Plan: linear-gradient(135deg, #1f2937 0%, rgba(34, 197, 94, 0.08) 100%)
```

---

## 🔤 Tipografia

### Família de Fontes
- **Principal**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif`

### Escalas de Tamanho

| Tamanho | Peso | Uso |
|---------|------|-----|
| **9px** | 400 | Status, Rodapé |
| **10px** | 400-700 | Labels, Buttons pequenos |
| **11px** | 400-600 | Subtítulo, Descrição |
| **12px** | 400-600 | Texto primário, Card |
| **14px** | 700 | Logo/Título pequeno |
| **16px** | 600-700 | Seção heading |
| **18px** | 700 | Subtítulo grande |
| **20px** | 700 | Preço grande |
| **24px** | 600 | Título grande |

### Cores de Texto

- **Primário**: `#e5e7eb` (Branco-cinzento)
- **Secundário**: `#d1d5db` (Cinza claro)
- **Terciário**: `#9ca3af` (Cinza médio)
- **Inverso**: `#020617` (Preto em fundo claro)

---

## 📏 Grid e Espaçamento

### Sistema de Grid
- **Base**: 4px
- **Coluna**: 12 colunas (desktop)

### Espaçamento Padrão

| Token | Tamanho | Uso |
|-------|---------|-----|
| `xs` | 4px | Gaps mínimos |
| `sm` | 6-8px | Padding interno |
| `md` | 12px | Padding padrão |
| `lg` | 16px | Margin entre componentes |
| `xl` | 24px | Margin seção |
| `2xl` | 32px+ | Margin grande |

### Altura/Largura Padrão

- **Buttons**: 32-44px altura
- **Inputs**: 40px altura
- **Cards**: Variável (min 100px)
- **Avatar**: 32px diâmetro

---

## 🧩 Componentes

### Button (CTA Primária)

**Variante**: `.btn-primary`
```
Background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%)
Text: Branco, 12px, Font-weight 600
Padding: 12px 20px
Border-radius: 4px
Cursor: pointer
Transition: all 0.2s

Hover State:
  - Brightness increase
  - Box-shadow: 0 6px 20px rgba(34, 197, 94, 0.15)
```

### Button (Secundário)

**Variante**: `.btn-secondary`
```
Background: #374151
Border: 2px solid #374151
Text: #d1d5db, 12px, Font-weight 600
Padding: 10px 16px
Border-radius: 4px

Hover State:
  Border-color: #22c55e
  Background: #2d3748
```

### Button (Terciário/Voltar)

**Variante**: `.btn-back`
```
Background: Transparent
Border: 2px solid #374151
Text: #d1d5db, 12px, Font-weight 600
Padding: 10px 16px
Border-radius: 4px

Hover State:
  Border-color: #22c55e
  Background: rgba(34, 197, 94, 0.1)
  Color: #22c55e
```

### Button (Free)

**Variante**: `.btn-free`
```
Background: #374151
Text: #e5e7eb, 10px, Font-weight 600
Padding: 8px 16px
Border-radius: 16px
Border: none

Hover State:
  Background: #22c55e
  Color: #020617
```

### Button (Pro)

**Variante**: `.btn-pro`
```
Background: #22c55e
Text: #020617, 10px, Font-weight 600
Padding: 8px 16px
Border-radius: 16px
Border: none

Hover State:
  Background: #16a34a
  Box-shadow: enhanced
```

### Card (Plan)

**Variante**: `.plan-card`
```
Background: linear-gradient(135deg, #1f2937 0%, #111827 100%)
Border: 2px solid #374151
Border-radius: 10px
Padding: 24px
Transition: all 0.3s

States:
  Hover:
    - Border-color: #22c55e
    - Background: linear-gradient(135deg, #1f2937 0%, rgba(34, 197, 94, 0.08) 100%)
    - Box-shadow: 0 8px 24px rgba(34, 197, 94, 0.1)

  Focus:
    - Same as hover
```

### Card (Device)

**Variante**: `.device-card`
```
Background: #1f2937
Border: 2px solid #374151
Border-radius: 6px
Padding: 16px
Display: flex (horizontal)
Gap: 12px
Cursor: pointer

States:
  Hover:
    - Border-color: #22c55e
    - Background: #2d3748
    - Box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1)

Content:
  - Icon (SVG 48x48)
  - Device info (nome, size)
  - Arrow icon (right side)
```

### Card (File Type)

**Variante**: `.file-type-card`
```
Background: #1f2937
Border: 2px solid #374151
Border-radius: 6px
Padding: 20px
Text-align: center
Cursor: pointer

Children:
  - Icon (emoji 24px)
  - Title (14px, bold)
  - Description (11px, gray)

States:
  Hover:
    - Border-color: #22c55e
    - Background: rgba(34, 197, 94, 0.08)
```

### Progress Bar

**Variante**: `.progress-bar`
```
Background: #1f2937
Height: 6px
Border-radius: 3px
Overflow: hidden

Fill:
  - Background: #22c55e
  - Height: 100%
  - Border-radius: 3px
  - Animation: width smooth 0.3s
```

### Badge

**Variante**: `.plan-badge`
```
Background: rgba(34, 197, 94, 0.1)
Border-radius: 4px
Padding: 4px 8px
Font-size: 10px
Color: #22c55e
Font-weight: 600
Margin-bottom: 8px
```

### Feature Item

**Variante**: `.feature-item`
```
Display: flex
Gap: 8px
Align-items: flex-start
Padding: 8px 0
Font-size: 12px
Color: #d1d5db

Icon:
  Color: #22c55e (included)
  Color: #ef4444 (excluded)

Included:
  - Color: #22c55e
  
Excluded:
  - Color: #9ca3af
  - Opacity: 0.6
```

### Modal/Dialog

**Variante**: `.policy-modal`
```
Position: fixed
Top: 0, Left: 0
Width: 100vw
Height: 100vh
Background: rgba(0, 0, 0, 0.7)
Display: flex
Justify-content: center
Align-items: center
Z-index: 1000
Backdrop-filter: blur(2px)

Content Box:
  Background: #0f172a
  Border: 1px solid #1f2937
  Border-radius: 8px
  Padding: 24px
  Max-width: 600px
  Max-height: 80vh
  Overflow-y: auto
```

---

## 🖼️ Telas

### Tela 1: Comparação de Planos

**Componentes principais:**
- Header (logo + usuário + logout)
- Heading: "Escolha seu Plano" (24px, bold)
- Subtitle: "Selecione FREE para começar ou upgrade para PRO" (12px, gray)
- Filter buttons: [FREE] [PRO] (pill style, toggle)
- 2 Plan Cards lado a lado (flex, gap 24px)
- Acessibilidade menu (canto superior direito)
- Footer (links + copyright)

**Estrutura:**
```
┌─────────────────────────────────────────┐
│ Filesfy          User | Logout | Access │
├─────────────────────────────────────────┤
│                                         │
│    Escolha seu Plano                   │
│    Descrição                           │
│    [FREE] [PRO]                        │
│                                         │
│  ┌──────────┐         ┌──────────┐     │
│  │  FREE    │         │  PRO     │     │
│  │  Grátis  │         │ R$ 15,99 │     │
│  │ [Button] │         │ [Button] │     │
│  │ Features │         │ Features │     │
│  └──────────┘         └──────────┘     │
│                                         │
├─────────────────────────────────────────┤
│ © 2026 | Privacy | Product | License   │
└─────────────────────────────────────────┘
```

---

### Tela 2: Seleção de Dispositivo

**Componentes principais:**
- Heading: "Selecione um Dispositivo" (18px, bold)
- Device cards (stack vertical, full width)
- Cada card: Icon + Name + Size + Arrow
- Back button

**Estrutura:**
```
┌─────────────────────────────────────────┐
│ Filesfy          User | Logout | Access │
├─────────────────────────────────────────┤
│                                         │
│    Selecione um Dispositivo            │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ 💾 Disco Local      500GB      → │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ 🖥️  HD Externo     1TB         → │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ 🔌 Pendrive        32GB         → │  │
│  └──────────────────────────────────┘  │
│                                         │
│  [← Voltar]                            │
├─────────────────────────────────────────┤
│ Step 1 of 5                             │
└─────────────────────────────────────────┘
```

---

### Tela 3: Seleção de Tipo de Arquivo

**Componentes principais:**
- Heading: "Selecione o Tipo de Arquivo" (18px, bold)
- 5 File type cards (grid 2x3 ou 1x5 responsivo)
- Cada card: Emoji + Nome + Descrição
- Back button

**Cards:**
1. 📁 Todos os Arquivos
2. 🖼️ Imagens
3. 🎬 Vídeos
4. 📄 Documentos
5. 🎵 Áudio

**Estrutura:**
```
┌─────────────────────────────────────────┐
│ Filesfy          User | Logout | Access │
├─────────────────────────────────────────┤
│                                         │
│    Selecione o Tipo de Arquivo         │
│                                         │
│  ┌──────────┐ ┌──────────┐             │
│  │    📁    │ │    🖼️    │             │
│  │  Todos   │ │ Imagens  │             │
│  │Recuperar│ │ Fotos    │             │
│  └──────────┘ └──────────┘             │
│                                         │
│  ┌──────────┐ ┌──────────┐             │
│  │    🎬    │ │    📄    │             │
│  │ Vídeos   │ │Documentos│             │
│  │ Filmes   │ │ Word,PDF │             │
│  └──────────┘ └──────────┘             │
│                                         │
│  ┌──────────┐                          │
│  │    🎵    │                          │
│  │  Áudio   │                          │
│  │ Músicas  │                          │
│  └──────────┘                          │
│                                         │
│  [← Voltar]                            │
├─────────────────────────────────────────┤
│ Step 2 of 5                             │
└─────────────────────────────────────────┘
```

---

### Tela 4: Varredura em Progresso

**Componentes principais:**
- Heading: "Varrendo Dispositivo..." (18px, bold)
- Progress bar (full width, 6px altura)
- Percentual (00%)
- Status text: "Analisando setor Disco Local..."

**Estrutura:**
```
┌─────────────────────────────────────────┐
│ Filesfy          User | Logout | Access │
├─────────────────────────────────────────┤
│                                         │
│    Varrendo Dispositivo...             │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │███████████░░░░░░░░░░░░░░░░░░│  │
│  └─────────────────────────────────┘  │
│    45%                                  │
│    Analisando setor Disco Local...     │
│                                         │
├─────────────────────────────────────────┤
│ Step 3 of 5                             │
└─────────────────────────────────────────┘
```

---

### Tela 5: Resultados de Varredura

**Componentes principais:**
- Heading: "Arquivos Encontrados" (18px, bold)
- Header com [Select All] e "0/X selecionados"
- List de arquivos (scrollable)
- Cada item: Checkbox + Icon + Nome + Tamanho + [Locked icon se FREE]
- [Recuperar] button (desabilitado se none selecionado)
- Back button

**Estrutura:**
```
┌─────────────────────────────────────────┐
│ Filesfy          User | Logout | Access │
├─────────────────────────────────────────┤
│                                         │
│    Arquivos Encontrados                │
│                                         │
│  [Selecionar Tudo]  0/8 selecionados   │
│                                         │
│  ☑ 🖼️  Foto_Férias.jpg    4.2MB       │
│  ☐ 🎬  Vídeo_Aniver.mp4   512MB       │
│  ☐ 📄  Doc_Importante.pdf  2.1MB       │
│  ☐ 📊  Planilha_2024.xlsx  1.5MB       │
│  ☐ 🎵  Música.mp3         8.5MB       │
│  ☐ 📊  Apresentação.pptx  15.3MB       │
│  ☐ 📦  Backup.zip 🔒       52.1MB  [PRO]│
│  ☐ 💾  Database.sql 🔒     128.5MB [PRO]│
│                                         │
│  [Recuperar Selecionados]              │
│  [← Voltar]                            │
├─────────────────────────────────────────┤
│ Step 4 of 5                             │
└─────────────────────────────────────────┘
```

---

### Tela 6: Recuperação em Progresso

**Componentes principais:**
- Heading: "Recuperando Arquivos..." (18px, bold)
- Progress bar (full width)
- Percentual
- Status: "Recuperando 3 arquivo(s)..."

**Estrutura:**
```
┌─────────────────────────────────────────┐
│ Filesfy          User | Logout | Access │
├─────────────────────────────────────────┤
│                                         │
│    Recuperando Arquivos...             │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │██████████████████░░░░░░░░░░░░│  │
│  └─────────────────────────────────┘  │
│    67%                                  │
│    Recuperando 3 arquivo(s)...         │
│                                         │
├─────────────────────────────────────────┤
│ Step 5 of 5                             │
└─────────────────────────────────────────┘
```

---

### Tela 7: Sucesso na Recuperação

**Componentes principais:**
- Grande ícone de sucesso (✓ verde, 64px)
- Heading: "Recuperação Concluída!" (20px, bold, verde)
- Message: "3 arquivo(s) recuperado(s) com sucesso"
- Path: "Os arquivos foram salvos em C:\Filesfy\Recovered"
- [Nova Recuperação] button
- [Voltar ao Início] button

**Estrutura:**
```
┌─────────────────────────────────────────┐
│ Filesfy          User | Logout | Access │
├─────────────────────────────────────────┤
│                                         │
│               ✅ (64px verde)           │
│                                         │
│    Recuperação Concluída!              │
│                                         │
│    3 arquivo(s) recuperado(s) com      │
│    sucesso                              │
│                                         │
│    Os arquivos foram salvos em         │
│    C:\Filesfy\Recovered                │
│                                         │
│  [Iniciar Nova Recuperação]            │
│  [Voltar ao Início]                    │
│                                         │
├─────────────────────────────────────────┤
│ © 2026 | Privacy | Product | License   │
└─────────────────────────────────────────┘
```

---

## 🔄 Fluxos e Interações

### Fluxo Principal: Recuperação de Arquivo

```
┌─────────────────────┐
│  Planos             │
│  (FREE vs PRO)      │
└──────────┬──────────┘
           │
      Seleciona PLANO
           │
           ↓
┌─────────────────────┐
│  Dispositivo        │
│  (Local/HD/Mobile)  │
└──────────┬──────────┘
           │
      Seleciona DEVICE
           │
           ↓
┌─────────────────────┐
│  Tipo de Arquivo    │
│  (Imagem/Vídeo)     │
└──────────┬──────────┘
           │
      Seleciona TIPO
           │
           ↓
┌─────────────────────┐
│  Varredura          │
│  (Progress 0-100%)  │
└──────────┬──────────┘
           │
      Finaliza SCAN
           │
           ↓
┌─────────────────────┐
│  Resultados         │
│  (Select & Review)  │
└──────────┬──────────┘
           │
      Seleciona ARQUIVOS
           │
           ↓
┌─────────────────────┐
│  Recuperação        │
│  (Progress 0-100%)  │
└──────────┬──────────┘
           │
      Finaliza RECOVERY
           │
           ↓
┌─────────────────────┐
│  Sucesso!           │
│  (Download ready)   │
└─────────────────────┘
```

### Interações Detalhadas

#### 1. Tela de Planos

**Ao clicar em [FREE]:**
- Transição para Tela Home (mostra plano FREE)
- Botão "Iniciar Recuperação" habilitado

**Ao clicar em [PRO]:**
- Abre tela de autenticação
- Se autenticado → Tela Payment
- Se cancelado → Volta a Planos

**Botão [Selecionar Tudo]:**
- Alterna checkbox de todos itens (checked/unchecked)
- Update counter "X/Y selecionados"

---

#### 2. Tela de Dispositivos

**Ao clicar em card:**
- Card ganha efeito hover (border verde, sombra)
- Ao soltar → Vai para Tela de Tipos

**Ao clicar [← Voltar]:**
- Volta para Planos

**Estados:**
- Hover: Border #22c55e, Background #2d3748
- Active/Clicked: Mesmo do hover + Arrow destaca

---

#### 3. Tela de Tipos de Arquivo

**Ao clicar em card:**
- Card ganha efeito hover
- Ao soltar → Vai para Varredura

**Estados:**
- Hover: Background com tint verde
- Active: Border + Background altera

---

#### 4. Varredura

**Animação Progress:**
- Inicia em 0%
- Incrementa ~15% a cada 400ms
- Ao atingir 100% → Espera 800ms → Vai para Resultados
- Texto muda: "45%", "82%", etc.

---

#### 5. Resultados

**Checkbox:**
- Ao clicar → Toggle state
- Update counter em tempo real
- FREE plan: Máximo 5 itens selecionáveis (rest disabled)

**Itens bloqueados (PRO):**
- Aparecem com ícone 🔒
- Checkbox disabled
- Texto em cinza claro
- Label "[PRO]" em amarelo

**Botão [Recuperar]:**
- Desabilitado se 0 selecionados (gray, cursor not-allowed)
- Habilitado se 1+ selecionados
- Clique → Vai para Recuperação

---

#### 6. Recuperação

**Animação Progress:**
- Inicia em 0%
- Incrementa ~12% a cada 300ms
- Ao atingir 100% → Espera 800ms → Vai para Sucesso

---

#### 7. Sucesso

**Ao clicar [Iniciar Nova Recuperação]:**
- Volta para Tela de Dispositivos (reset)

**Ao clicar [Voltar ao Início]:**
- Volta para Home (mostra plano atual)

---

### Componentes com Acessibilidade

**Menu de Acessibilidade (canto superior direito):**
- Botão Toggle: ♿ Acessibilidade
- Ao clicar: Abre painel flutuante
- Opções:
  - [A+] Aumentar zoom
  - [A-] Reduzir zoom
  - [Contraste] Alto contraste ativado
  - [Leitura] Leitura ao passar mouse
- Fecha ao clicar fora ou ESC

**Zoom:**
- Mín: 90% (0.9x)
- Máx: 125% (1.25x)
- Incremento: 10% por clique
- Aplica a todo body

**Alto Contraste:**
- Aumenta saturação de cores
- Bordas mais visíveis
- Texto mais nítido

**Leitura por Voz:**
- Hover em elemento → Fala em PT-BR
- Máximo 180 caracteres por leitura
- Cancela leitura anterior se nova for acionada

---

## 📐 Implementação em Figma

### Passos Recomendados

1. **Criar arquivo "Filesfy Design System"**
2. **Criar componentes base:**
   - Buttons (Primary, Secondary, Tertiary, Free, Pro)
   - Cards (Plan, Device, FileType)
   - Progress Bar
   - Badge
   - Feature Item

3. **Criar páginas por tela:**
   - Page 1: Plans
   - Page 2: Device Selection
   - Page 3: File Type Selection
   - Page 4: Scan Progress
   - Page 5: Results
   - Page 6: Recovery Progress
   - Page 7: Success

4. **Adicionar interactive components:**
   - Toggle states (hover, active, disabled)
   - Modal overlays
   - Progress animations (simulate com key frames)

5. **Criar protótipo:**
   - Conectar screens com transições
   - Definir triggers (botões para próxima tela)
   - Testar fluxo completo

---

## 🎯 Referência de Proporções

### Desktop (Padrão)
- **Largura**: 1024px
- **Height**: 768px (min)
- **Margem**: 12px
- **Gap entre componentes**: 16-24px

### Responsividade
- **Mobile**: 320px - 480px (não implementado ainda)
- **Tablet**: 480px - 1024px (não implementado ainda)

---

## 📝 Notas Importantes

- ✅ Nenhuma alteração foi feita no código do projeto
- ✅ Este é apenas um documento de referência visual
- ✅ Use como guia no Figma para prototipagem
- ✅ Mantenha os mesmos códigos de cor (#hex) para consistência
- ✅ Todas as interações estão descritas para serem reproduzidas em protótipos Figma

---

**Criado em**: 24 de Janeiro de 2026
**Versão**: 1.0
**Status**: Pronto para Figma

