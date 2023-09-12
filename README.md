# Pumpkin Store API

## Ambiente

Crie um arquivo `.env` na raíz do projeto contendo as seguintes váriaveis de ambiente:

```sh
# Application:
appHost = localhost
appPort = 3001

# Database:
dbHost = localhost
dbPort = 3002
dbUser = abobra
dbPassword = ???
dbName = pumpkin
dbVolume = /database/postgres:/pumpkin

# Node Modules:
ormSync = true
jwtSecret = 'ultimate secret'
jwtExpiresIn = 192h
```

## Docker

Opcionalmente, erga o PostgreSQL pelo docker usando o seguinte comando:

```sh
npm run docker

# Abrir terminal PSQL no Docker.
npm run psql
```

## Execução

Para começar a API, rode um dos seguintes comandos:

```sh
npm start
# ou
npm run dev
```
