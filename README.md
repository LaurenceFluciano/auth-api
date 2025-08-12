<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Uma aplicação de autenticação construída com <a href="https://nodejs.org" target="_blank">Node.js</a> e o framework <a href="https://nestjs.com/" target="_blank">NestJS</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI Build Status" /></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
</p>

---

## Instruções para instalação

> ⚠️ **Importante:**  
> É necessário ter o `Node.js` instalado em sua máquina. Caso não tenha, acesse o site oficial para [baixar o Node.js](https://nodejs.org/pt/download).

### Passos para começar:

1. Clone este repositório:

```bash
$ git clone https://github.com/LaurenceFluciano/auth-api-nestjs.git
```

2. Acesse o diretório do projeto clonado:

```bash
$ cd auth-api-nestjs
```

### Instale as dependências usando pnpm:

```bash
pnpm install
```

### Como executar o projeto

Execute o projeto no modo desenvolvimento com hot reload:

```bash
pnpm run start:dev
```

Ou rode no modo normal:

```bash
pnpm run start
```

### Executando os testes

#### Testes unitários:

```bash
pnpm run test
```

#### Cobertura dos testes:

```bash
pnpm run test:cov
```

### Documentação Swagger UI

Após iniciar o projeto, acesse a documentação da API pelo seguinte endereço:

- [http://localhost:8000/api](http://localhost:8000/api)

> **Observação:** A porta `8000` está configurada diretamente no código (hardcoded). Recomendo utilizar uma variável de ambiente para definir a porta, garantindo maior flexibilidade e segurança em diferentes ambientes.

# Tabela das Variáveis de Configuração necessárias

| Variável                   | Descrição                                            | Exemplo / Observação                       |
|---------------------------|-----------------------------------------------------|-------------------------------------------|
| `DATABASE_URI`             | String de conexão ao banco MongoDB                     | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `SECRET_TOKEN_JWT`         | Chave secreta para assinatura dos tokens JWT           | Deve ser forte e secreta                   |
| `SMTP_USER`                | Usuário para autenticação SMTP                         | Normalmente um e-mail                      |
| `SMTP_PASS`                | Senha para autenticação SMTP                           | `<senha_smtp>`                               |
| `SMTP_PORT`                | Porta do servidor SMTP                                 | `587` (STARTTLS padrão)                    |
| `GMAIL_SMTP_TRANSPORTER`   | Endereço SMTP do Gmail                                 | `smtp.gmail.com`                           |
| `OUTLOOK_SMTP_TRANSPORTER` | Endereço SMTP do Outlook                               | `smtp.outlook.com`                         |
| `NODE_ENV`                 | Ambiente de execução da aplicação                      | `development`, `production`, `test`        |
| `ACCESS_TOKEN_EXPIRE_IN`   | Tempo de expiração do token de acesso                  | `15m` (15 minutos)                         |
| `REFRESH_TOKEN_EXPIRE_IN`  | Tempo de expiração do token de atualização             | `1h` (1 hora)                              |
| `REDIS_USER`               | Usuário para autenticação no Redis                     | `<redis_username>`                           |
| `REDIS_PASSWORD`           | Senha para autenticação no Redis                       | `<redis_password>`                           |
| `REDIS_HOST`               | Endereço do servidor Redis                             | `<redis_host>`                               |
| `REDIS_PORT`               | Porta do servidor Redis                                | `<redis_port>`                               |


## Licença:

O framework NestJs está licenciado sob a [licença MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
MIT
