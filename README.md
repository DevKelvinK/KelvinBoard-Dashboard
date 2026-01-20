# 🚀 Teste Técnico Front-End (Angular)

Este repositório contém o desenvolvimento de um **teste técnico para vaga de estágio em Front-End (Angular)**.  
O projeto utiliza **Angular 18**, **standalone components** e é **100% mockado**, sem backend real.  

O foco é implementar **autenticação, primeiro acesso, proteção de rotas e dashboard simples**, seguindo boas práticas de modularização e UX mínima.

---

## 🧱 Stack utilizada

- Angular 18
- TypeScript
- RxJS
- Reactive Forms
- Standalone Components
- LocalStorage (simulação de sessão via StorageService)
- Mock de backend (`ApiMockService`)

---

## 📂 Estrutura do projeto
```bash
src/
├── app/
│ ├── auth/ ← Módulo de autenticação (login, create-password, forgot-password)
│ ├── dashboard/ ← Módulo protegido
│ ├── core/ ← Services, guards e models
│ ├── shared/ ← Componentes reutilizáveis (BaseInput, FormError)
│ └── app.routes.ts ← Rotas lazy-loaded
└── assets/
```

- **Modules**:
  - `AuthModule` → login, create-password, forgot-password  
  - `DashboardModule` → dashboard protegido  
- **Core**:
  - `StorageService` → gerencia token no `localStorage`  
  - `AuthService` → login/logout usando mock  
  - `ApiMockService` → simula backend  
  - `AuthGuardService` → protege rotas via `canMatch`  
- **Shared**:
  - `BaseInputComponent` → inputs consistentes e integrados com Reactive Forms  
  - `FormErrorComponent` → mensagens de erro declarativas, para campos individuais e FormGroup

---

## ✅ Funcionalidades implementadas

- **Login**
  - Reactive Forms com validação (required, email, minlength)
  - Mock de autenticação
  - Token salvo no `localStorage` via `StorageService`
  - Redirecionamento para dashboard após sucesso

- **Create Password (primeiro acesso)**
  - Formulário com validação (senha, confirmação)
  - Verificação de senha e confirmação via `FormGroup` validator
  - Mock de criação de senha

- **Proteção de Rotas**
  - `AuthGuard` usando `canMatch` para lazy-loaded modules
  - Redireciona para `/login` se não autenticado

- **Logout**
  - Limpa token no `sessionStorage`
  - Redireciona para `/login`

- **Componentes reutilizáveis**
  - `BaseInputComponent` → inputs consistentes e integrados com Reactive Forms  
  - `FormErrorComponent` → mensagens de erro declarativas, para campos individuais e FormGroup

---

## 📌 Funcionalidades pendentes

- Recuperação de senha (Forgot Password)
- Validação de código de recuperação (mock)
- Design completo para o Dashboard (atualmente em desenvolvimento)
- UX adicional: loading, feedback visual e animações

---

## 🧪 Mock de Backend

- `ApiMockService` simula backend em memória  
- Usuários armazenados em array  
- Token fake: `mock-token-123`  
- Métodos simulados:  
  - Login  
  - Create Password / Primeiro acesso  
  - Recuperação de senha (em desenvolvimento)  

---

## 🎯 Objetivo do projeto

- Implementar **teste técnico funcional**  
- Seguir boas práticas de Angular 18  
- Criar **modularidade clara** (Core, Shared, feature modules)  
- Garantir **UX mínima e validação de formulários**  
- Ter **mock bem implementado**. 

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
