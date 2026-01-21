# Teste Técnico – Front-End (Angular)

Projeto desenvolvido como parte do processo seletivo para **vaga de Estágio Front-End**, conforme especificações do desafio técnico.

---

## ▶️ Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/DevKelvinK/KelvinBoard-Dashboard.git
```

2. Entre na pasta do projeto:
```bash
cd KelvinBoard-Dashboard
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
- Todas as respostas possuem delay simulado (800ms)

---

## 🧠 Decisões técnicas

- Angular 18 com **Reactive Forms**
- Tipagem forte com **interfaces e DTOs**
- Arquitetura modular:
  - `AuthModule`
  - `DashboardModule`
  - `CoreModule`
  - `SharedModule`
- Autenticação e backend **100% mockados no front-end**
- Uso de **guards** para proteção de rotas
- Componentes reutilizáveis para inputs e validações
- Foco em **UX**, mensagens claras e estados de loading/erro/vazio

---

## 🚀 Melhorias futuras

- Integração com backend real
- Testes unitários (Jasmine/Karma)
- Persistência real de usuários
- Paginação na tabela do dashboard
- Refresh token e interceptor global
- Melhorias visuais e animações

---

Desenvolvido por [**Kelvin Kesley**](https://www.linkedin.com/in/kelvin-kesley/).
