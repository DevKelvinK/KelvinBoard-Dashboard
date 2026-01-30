# KelvinBoard Dashboard — Teste Técnico (Angular)

Projeto desenvolvido como parte de um **teste técnico para vaga de Estágio Front-End**, com foco em **fluxo de autenticação completo** e **dashboard com KPIs, gráfico e tabela**.

🔗 **Deploy (GitHub Pages):**
https://devkelvink.github.io/KelvinBoard/

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com validações e mensagens por campo
- Criar senha (primeiro acesso)
- Recuperar senha (2 passos)
- Proteção de rotas com Auth Guard
- Token mock salvo no `localStorage`

### 📊 Dashboard
- KPIs: Receita, Pedidos e Ticket Médio
- Filtro de período: **7 dias** e **30 dias**
- Gráfico de linha: **receita por dia**
- Tabela com:
  - Busca por cliente
  - Ordenação por valor
- Estados bem tratados:
  - Loading
  - Sem dados
  - Erro + botão “Tentar novamente”

---

## ▶️ Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/DevKelvinK/KelvinBoard.git
```

2. Entre na pasta do projeto:
```bash
cd KelvinBoard
```

3. Instale as dependências:
```bash
npm install
```

4. Rode o projeto:
```bash
ng serve
```

5. Acesse no navegador:
```
http://localhost:4200
```

---

## 👤 Usuário de teste

- **E-mail:** primeiroacesso@email.com  
- **Senha:** (criar no primeiro acesso)  
- **Código mock:** 123456  

> Obs: o login só funciona após a criação de senha (fluxo de primeiro acesso).

---

## 🔐 Código mock

- **Código de criação/recuperação de senha:** `123456`

Regras simuladas:
- Código expira em **2 minutos**
- Reenvio permitido após **30 segundos**
- Respostas com delay simulado para representar chamadas de API

---

## 🧠 Decisões técnicas

- Angular 18 + TypeScript
- **Reactive Forms** com validações e mensagens
- Tipagem forte com **interfaces e DTOs**
- Arquitetura modular:
  - `AuthModule`
  - `DashboardModule`
  - `CoreModule`
  - `SharedModule`
- Backend e autenticação **100% mockados no front-end**
- Uso de **Guards** para proteção de rotas
- Componentização e reutilização de UI (inputs/validações)
- Foco em UX: estados de loading/erro/vazio e feedback claro

---

## 🚀 Melhorias futuras

- Integração com backend real
- Testes unitários (Jasmine/Karma)
- Paginação na tabela do dashboard
- Interceptor global + refresh token
- Melhorias visuais e animações

---

Desenvolvido por **Kelvin Kesley**  
🔗 LinkedIn: https://www.linkedin.com/in/kelvin-kesley/
