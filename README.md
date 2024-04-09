<h1 align="center">Food Explorer: Back-End</h1>

<div align="center">
  <a href="#english">English</a> |
  <a href="#portugues">Português</a>
</div>

---

# English <a name = "english"></a>

Food Explorer - Back-End is a **[Restful API](https://aws.amazon.com/what-is/restful-api/)** developed to communicate with the frontend of the Food Explorer application.

## Summary

- [Technologies Used](#technologies-used-en)
- [Project Structure](#project_structure_en)
- [Installation](#installation-en)
- [Unit Tests](#unit-tests-en)
- [Deploy](#deploy-en)
- [Route Documentation](#route-documentation-en)
- [Author](#author-en)

## 🚀 Technologies Used <a name = "tecnologies-used-en"></a>

- **[Node.js](https://nodejs.org/)**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **[Express](https://expressjs.com/)**: Web framework for Node.js.
- **[Express Async Errors](https://www.npmjs.com/package/express-async-errors)**: Middleware for handling asynchronous errors in Express.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from a .env file.
- **[Cors](https://www.npmjs.com/package/cors)**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- **[Knex](http://knexjs.org/)**: SQL query builder for Node.js.
- **[Sqlite](https://www.npmjs.com/package/sqlite)**: Serverless SQL database engine.
- **[SQLite3](https://www.npmjs.com/package/sqlite3)**: SQLite bindings for Node.js.
- **[Multer](https://www.npmjs.com/package/multer)**: Middleware for handling multipart/form-data.
- **[JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)**: JSON-based access tokens for securing web applications.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: Library for hashing passwords.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Middleware for parsing cookies in Express.
- **[Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)**: Middleware for serving Swagger UI documentation in Express.
- **[Jest](https://jestjs.io/)**: Testing framework for JavaScript.
- **[Nodemon](https://www.npmjs.com/package/nodemon)**: Utility for automatically restarting Node.js server during development.

## 📁 Structure of the project <a name = "project_structure_en"></a>
The project structure is as follows:

```
├── src: directory containing application source files

│   ├── config: directory containing application configuration files, such as authentication and file upload settings.

│   ├── controllers: directory containing files that handle application routes. Each file manages routes for a specific type of data, such as users, products, and orders.

│   ├── database: directory containing database configuration files. It includes scripts for creating database tables, the database connection file, and the actual database file.

│   ├── middlewares: directory containing application middleware files, such as authentication and user type verification middleware.

│   ├── providers: directory containing application provider files, such as the file upload provider.

│   ├── repositories: directory containing application repository files, responsible for performing database operations. It also includes in-memory repository files used for testing application routes.

│   ├── routes: directory containing application route files.

│   ├── services: directory containing application service files, responsible for executing operations necessary for the application routes to function. This folder, along with test files, contains the most critical files in the application.

│   ├── utils: directory containing utility files for the application, such as error handling.

│   └── server.js: file that initializes the application.

├── tmp: directory containing application upload files.

├── .env.example: example file for environment variables.

```

## 🛠️ Installation <a name = "installation-en"></a>

1. Clone the repository or download and extract the ZIP file from the repository.
```
git clone https://github.com/Vitinho163/Food-Explorer-BackEnd.git
``` 

2. Install dependencies:
```
npm install
```  

3. Run migrations:
```
npm run migrate
```

4. Rename the `.env.example` file to `.env` and fill in the information:
```
PORT=
SECRET_KEY=
```

5. Start the server:
```
npm run dev
```

## 🧪 Unit Tests <a name = "unit-tests-en"></a>

To run unit tests, use the command:
```
npm run test
```

## 💻 deploy <a name = "deploy-en"></a>

This API was hosted directly on Render.

The deployment can be accessed at the address: 
```
https://food-explorer-bhyu.onrender.com/
```

>Note: As it is hosted on a free service, the application 'hibernates' after 15 minutes of inactivity. If you are trying to access the site and the BackEnd does not respond, just wait, as it will be 'initializing' the services.

## 📖 Route Documentation <a name = "route-documentation-en"></a>

The documentation for all routes is available at:
```
http://localhost:{port}/api-docs/
```

Make sure to replace `{port}` with the port defined in the `.env` file. If not defined, try accessing it with the default port 3333.

>Note: This application was developed using Node.js version v18.15. In case of issues, try updating Node.js to the latest version.

<div align="center" name="author-en">
  <h4>Created with ❤️ by <a href="https://github.com/Vitinho163">João Victor</a></h4>
</div>

---
<br>

# Português <a name = "portugues"></a>

Food Explorer - Back-End é uma **[API Restful](https://aws.amazon.com/pt/what-is/restful-api/)** desenvolvida para se comunicar com o frontend da aplicação Food Explorer.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-usadas-pt)
- [Estrutura do Projeto](#estrutura-do-projeto-pt)
- [Instalação](#instalacao-pt)
- [Testes Unitários](#testes-unitarios-pt)
- [Deploy](#deploy-pt)
- [Documentação das Rotas](#documentacao-das-rotas-pt)
- [Autor](#autor-pt)

## 🚀 Tecnologias Utilizadas <a name = "tecnologias-usadas-pt"></a>

- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript construído no motor JavaScript V8 do Chrome.
- **[Express](https://expressjs.com/)**: Framework web para Node.js.
- **[Express Async Errors](https://www.npmjs.com/package/express-async-errors)**: Middleware para lidar com erros assíncronos no Express.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Carrega variáveis de ambiente de um arquivo .env.
- **[Cors](https://www.npmjs.com/package/cors)**: Middleware para habilitar o Compartilhamento de Recursos de Origem Cruzada (CORS) no Express.
- **[Knex](http://knexjs.org/)**: Construtor de consultas SQL para Node.js.
- **[Sqlite](https://www.npmjs.com/package/sqlite)**: Motor de banco de dados SQL sem servidor.
- **[SQLite3](https://www.npmjs.com/package/sqlite3)**: Bindings SQLite para Node.js.
- **[Multer](https://www.npmjs.com/package/multer)**: Middleware para manipulação de dados multipart/form.
- **[JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)**: Tokens de acesso baseados em JSON para segurança de aplicações web.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: Biblioteca para hash de senhas.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Middleware para análise de cookies no Express.
- **[Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)**: Middleware para servir documentação Swagger UI no Express.
- **[Jest](https://jestjs.io/)**: Framework de teste para JavaScript.
- **[Nodemon](https://www.npmjs.com/package/nodemon)**: Utilitário para reiniciar automaticamente o servidor Node.js durante o desenvolvimento.

## 📁 Estrutura do Projeto <a name = "estrutura-do-projeto-pt"></a>
A estrutura do projeto é a seguinte:
```
├── src: diretório contendo os arquivos de origem da aplicação

│ ├── config: diretório contendo arquivos de configuração da aplicação, como autenticação e configurações de upload de arquivos.

│ ├── controllers: diretório contendo arquivos que controlam as rotas da aplicação. Cada arquivo controla as rotas para um tipo específico de dado, como usuários, produtos e pedidos.

│ ├── database: diretório contendo arquivos de configuração do banco de dados. Inclui scripts para criar tabelas de banco de dados, o arquivo de conexão com o banco de dados e o próprio arquivo de banco de dados.

│ ├── middlewares: diretório contendo arquivos de middleware da aplicação, como autenticação e middleware de verificação de tipo de usuário.

│ ├── providers: diretório contendo arquivos de provedor da aplicação, como o provedor de upload de arquivos.

│ ├── repositories: diretório contendo arquivos de repositório da aplicação, responsáveis por realizar operações no banco de dados. Também inclui arquivos de repositório em memória usados para testar as rotas da aplicação.

│ ├── routes: diretório contendo arquivos de rota da aplicação.

│ ├── services: diretório contendo arquivos de serviço da aplicação, responsáveis por executar operações necessárias para as rotas da aplicação funcionarem. Esta pasta, junto com os arquivos de teste, contém os arquivos mais críticos da aplicação.

│ ├── utils: diretório contendo arquivos utilitários para a aplicação, como tratamento de erros.

│ └── server.js: arquivo que inicializa a aplicação.

├── tmp: diretório contendo arquivos de upload da aplicação.

|── .env.example: arquivo de exemplo para variáveis de ambiente.
```

## 🛠️ Instalação <a name = "instalacao-pt"></a>

1. Clone o repositório ou faça o download e extraia o arquivo ZIP do repositório.
```
git clone https://github.com/Vitinho163/Food-Explorer-BackEnd.git
``` 

2. Instale as dependências:
```
npm install
```

3. Execute as migrações:
```
npm run migrate
```

4. Renomeie o arquivo `.env.example` para `.env` e preencha as informações:
```
PORT=
SECRET_KEY=
```

5. Inicie o servidor:
```
npm run dev
```

## 🧪 Testes Unitários <a name = "testes-unitarios-pt"></a>

Para executar os testes unitários, utilize o comando:
```
npm run test
```

## 💻 Deploy <a name = "deploy-pt"></a>

Esta API foi hospedada diretamente no Render.

O deployment pode ser acessado no seguinte endereço:
```
https://food-explorer-bhyu.onrender.com/
```

>Nota: Como está hospedado em um serviço gratuito, a aplicação 'hiberna' após 15 minutos de inatividade. Se você estiver tentando acessar o site e o BackEnd não responder, basta aguardar, pois ele estará 'inicializando' os serviços.

## 📖 Documentação das Rotas <a name = "documentacao-das-rotas-pt"></a>

A documentação de todas as rotas está disponível em:
```
http://localhost:{port}/api-docs/
```


Certifique-se de substituir `{port}` pela porta definida no arquivo `.env`. Se não estiver definido, tente acessar com a porta padrão 3333.

>Nota: Esta aplicação foi desenvolvida usando a versão Node.js v18.15. Em caso de problemas, tente atualizar o Node.js para a versão mais recente.

<div align="center" name="autor-pt">
  <h4>Criado com ❤️ por <a href="https://github.com/Vitinho163">João Victor</a></h4>
</div>
