# TODO

## NOTES

- Monolito em Node
- Criar conta no MongoDB (sandbox = free tier) ✅
- Iniciar mongodb e depois express (inserir alguns componentes, ex: bodyParser) ✅
-  Separar entre endpoints publicos (read-only) e privados (CRUD)
   - Para privado criar auth simples (ex: apenas verificar se header veio com `authentication`)
   - Public so teremos o GET e o GET:Id
   - Private teremos o CRUD com todos os metodos basicos (PUT/PATCH/DELETE/POST/GET/GET:Id)
- Route esta sempre aninhada com o domain (todas as rotas sao dominios)
- Usar library mongoose (schema para estruturar JSON)
- Fluxo DDD: routes -> app -> repository -> domain
- - Criar dominino publico `Challenge`

## PADROES
- Nome dos arquivos minusculos e separados por dash caso seja nome composto `-` (ex: user-challenge.route.ts)

## PROJECT STRUCTURE
- /src
  - index.ts
  - /models
    - /chalenge
      - challenge-item.model.ts
      - index.ts
    - /misc (for generic models)
      - adress.model.ts
      - key-value.model.ts
      - index.ts
  - /heplers
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