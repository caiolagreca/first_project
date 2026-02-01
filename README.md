# SETUP

// Base64 of a json to simulate the JWT
Authentication: eyJpZCI6IjEiLCJmaXJzdE5hbWUiOiJUaGlhZ28iLCJzdXJuYW1lIjoiQmVybmFyZGVzIn0=

# NOTES

- Node monolith ✅
- Create MongoDB account (sandbox = free tier) ✅
- Start MongoDB first, then Express (add some components, ex: bodyParser) ✅
- Use Mongoose library (schema to structure JSON) ✅
- Create public `Challenge` domain ✅
- Separate between public endpoints (read-only) and private endpoints (CRUD) ✅
  - For private: create simple auth (ex: just check if `authentication` header is present) ✅
  - Public will only have GET and GET:Id ✅
  - Private will have full CRUD with all basic methods (PUT/PATCH/DELETE/POST/GET/GET:Id) ✅
- Routes are always nested with the domain (all routes are domains)
- DDD flow: routes -> app -> repository -> domain

# PATTERNS

- Filenames in lowercase and separated by dash if compound name `-` (ex: user-challenge.route.ts)

# PROJECT STRUCTURE

- /src
  - index.ts
  - /models
    - /challenge
      - challenge-item.model.ts
      - index.ts
    - /misc (for generic models)
      - address.model.ts
      - key-value.model.ts
      - index.ts
  - /helpers
    - util.ts (reused functions)
    - index.ts
  - /app
    - /challenge (group each domain by folder)
      - challenge.app.ts (referencia o repositorio - criar class Application)
      - challenge.domain.ts (schema)
      - challenge.repository.ts (CRUD do banco)
      - index.ts
  - /routes (importa somente o file `app`)
    - /p1 (for public endpoints)
      - challenge.route.ts
      - index.ts
    - /v1 (for private endpoints)
      - challenge.route.ts
      - index.ts

# QUESTIONS

- Documents interface extendend from mongoose in domain file. What is that?
- No challenge.domain, estou confuso de onde vem o userId (cade o Schema para criacao do usuario?)
- In the Interface at `challenge.domain` why not insert userId as `Types.ObjectId` instead of `string`?
- Difference between `challengeFormModel` and `challengeModel`?
- why create a `RepositoryBase` re-writting all methods from zero, if we could import all these methods from `mongoose`?

# TODO

- Criar dicionario/catalogo com mensagens de error/response
