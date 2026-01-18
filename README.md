# 🚀 Teste Técnico Front-End (Angular)

Este repositório contém o desenvolvimento de um **teste técnico para vaga de estágio em Front-end (Angular)**.  
O projeto é focado em **Angular com standalone components**, utilizando **mock** no lugar de backend real.

---

## 🧱 Stack utilizada

- Angular
- TypeScript
- RxJS
- Reactive Forms
- SessionStorage (simulação de sessão)
- Mock de backend (sem API real)

---

## ✅ Funcionalidades já implementadas

- **Login**
  - Formulário com Reactive Forms
  - Validação de e-mail e senha
  - Mock de autenticação
  - Token salvo no `sessionStorage`
  - Navegação após sucesso

- **Signup (Cadastro)**
  - Criação de usuário via mock
  - Validação de e-mail duplicado
  - Token salvo automaticamente após cadastro

- **Proteção de Rotas**
  - `AuthGuard` verificando token no `sessionStorage`
  - Redirecionamento para `/login` se não autenticado

---

## 📌 Funcionalidades pendentes

- Recuperação de senha (Forgot Password)
- Validação de código de recuperação (mock)
- Reset de senha
- Dashboard protegido
- UX mínima (loading, mensagens de erro, feedback visual)

---

## 🧪 Mock de Backend

- `ApiMockService` simula backend em memória
- Usuários armazenados em array
- Token fake (`mock-token-123`)
- Métodos simulados:
  - Login
  - Signup
  - Recuperação de senha (em desenvolvimento)

---

## 🎯 Objetivo

Entregar um projeto:
- Funcional
- Bem organizado
- Com mock bem implementado
- UX clara
- Alinhado ao que o teste técnico pede

---

## ▶️ Como rodar o projeto

### Pré-requisitos
- Node.js 18 LTS ou superior
- Angular 18 ou superior

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm start

# Acessar no navegador
http://localhost:4200