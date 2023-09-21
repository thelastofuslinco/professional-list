- .env

```shell
POSTGRESQL_PORT="5432"
POSTGRESQL_DATABASE="professional_list_api"
POSTGRESQL_PASSWORD="docker_password"
POSTGRESQL_USERNAME="docker_username"
DATABASE_URL="postgresql://docker_username:docker_password@localhost:5432/professional_list_api"
```

- .env.test

```shell
POSTGRESQL_PORT="5432"
POSTGRESQL_DATABASE="professional_list_api_test"
POSTGRESQL_PASSWORD="docker_password"
POSTGRESQL_USERNAME="docker_username"
DATABASE_URL="postgresql://docker_username:docker_password@localhost:5432/professional_list_api_test"
```

# compose

- "compose": "docker compose up -d",
- "compose:test": "dotenv -e .env.test -- docker compose up -d"

# migrate

- "migrate": "prisma migrate dev",
- "migrate:test": "dotenv -e .env.test -- prisma migrate dev"

# seed

- "seed": "ts-node prisma/seed.ts"
- "seed:test": "dotenv -e .env.test -- ts-node prisma/seed.ts"

# run

- "start": "nest start",
- "test": "dotenv -e .env.test -- jest"
