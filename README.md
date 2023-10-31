# Pumpkin Store back end

Back end do projeto Pumpkin Store: Loja de skins personalizadas para GTA 5 Roleplay.

## Como rodar

Crie um arquivo .env no diretório raíz e copie/cole as variáveis no tópico a seguir.

```bash
# Instalar dependências
npm i

# Rodar no modo dev
npm start
```

## Variáveis de ambiente (.env)

```bash
# Express
EXPRESS_PORT = 3001

# Docker/PostgreSQL
DOCKER_POSTGRES_VOLUME = /databases/postgres:/pumpkin-store

# TypeORM/PostgreSQL
TYPEORM_SYNCHRONIZE_POSTGRES = true

# PostgreSQL
POSTGRES_HOST = localhost
POSTGRES_PORT = 3002
POSTGRES_USER = strawman
POSTGRES_PASSWORD = treatortrick
POSTGRES_DATABASE = pumpkin_store

# JsonWebToken
JSONWEBTOKEN_SECRET = secret
JSONWEBTOKEN_EXPIRES_IN = 192h
```
