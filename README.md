# Pumpkin Store Back End

## Environment Variables

.env

```sh
# Express
API_PORT = 3001

# TypeORM
ORM_SYNC = true

# Bcrypt
BCRYPT_ROUNDS = 10

# JsonWebToken
JWT_SECRET = secret
JWT_EXPIRES_IN = 192h

# PostgreSQL
PG_HOST = localhost
PG_PORT = 3002
PG_USER = strawman
PG_PASSWORD = abobra
PG_DB = pumpkin_store
PG_VOLUME = /db/pg:/pumpkin_store

# Log Levels
TRACE_ENABLED = true
DEBUG_ENABLED = true
INFO_ENABLED = true
WARN_ENABLED = true
ERROR_ENABLED = true
FATAL_ENABLED = true
```
