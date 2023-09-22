# **📖 Passos para executar o projeto**

Este projeto utiliza as tecnologias Node.js, Docker e Prisma. Siga as instruções abaixo para executar o projeto em sua máquina local.

- [🌱 Pré-requisitos](#-pré-requisitos)
- [🏗️ Passo a passo](#%EF%B8%8F-passo-a-passo)
- [🚀 testes](#-testes)

## **🌱 Pré-requisitos**

- Node.js instalado em sua máquina
- Docker instalado em sua máquina

## **🏗️ Passo a passo**

1. Abra o terminal e navegue até a pasta raiz do projeto.

```shell
cd professional-list/
```

2. Execute o comando npm i para instalar todas as dependências do projeto.

```shell
npm i
```

3. Crie um arquivo .env e adicione suas informações de configuração na raiz do projeto.

```shell
# .env
JWT_SECRET='3HEHFOFyW1jQoZdgBjaIo0+W2FNbwD7WDR2z5jrxVNs='
POSTGRESQL_PORT="5432"
POSTGRESQL_DATABASE="professional_list_api"
POSTGRESQL_PASSWORD="docker_password"
POSTGRESQL_USERNAME="docker_username"
DATABASE_URL="postgresql://docker_username:docker_password@localhost:5432/professional_list_api"
```

4. Execute o comando para iniciar o contêiner do banco de dados.

```shell
npm run compose
```

5. Execute o comando para aplicar as migrações do banco de dados.

```shell
npm run migrate
```

6. Execute o comando para aplicar os serviços ao banco de dados.

```shell
npx prisma db seed
```

7. Execute o comando para iniciar o servidor.

```
npm run start
```

8. Abra outro terminal e navegue até a pasta do projeto front-end, disponível em

- [📚 Professional-list-web](https://github.com/thelastofuslinco/professional-list-web)

9. Siga as instruções fornecidas no README.md do projeto **professional-list-web** para continuar a configuração e execução do projeto.

O projeto está configurado para ser executado em http://localhost:3000. Certifique-se de que a porta esteja disponível em sua máquina antes de executar o projeto. Abra seu navegador e navegue até http://localhost:3000/api. Você deverá ver a documentação do app.

### 🚀 Testes

1. Crie um arquivo .env.test e adicione suas informações de configuração na raiz do projeto.

```shell
# .env.test
JWT_SECRET='3HEHFOFyW1jQoZdgBjaIo0+W2FNbwD7WDR2z5jrxVNs='
POSTGRESQL_PORT="5432"
POSTGRESQL_DATABASE="professional_list_api_test"
POSTGRESQL_PASSWORD="docker_password"
POSTGRESQL_USERNAME="docker_username"
DATABASE_URL="postgresql://docker_username:docker_password@localhost:5432/professional_list_api_test"
```

2. Execute o comando para iniciar o contêiner do banco de dados.

```shell
npx dotenv -e .env.test -- docker compose up -d
```

3. Execute o comando para aplicar as migrações do banco de dados.

```shell
npx dotenv -e .env.test -- prisma migrate dev
```

4. Execute o comando para iniciar os testes do projeto.

```
npm run test
npx jest --config ./test/jest-e2e.json
```
