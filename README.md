# API de Autenticação

Este repositório contém APIs de autenticação desenvolvidas em Node.js/NestJS.  

Atualmente, existem **duas versões** da API:

## 1. nestjs-auth-old
- **Status:** Completa e funcional.
- **Tecnologia:** NestJS
- **Descrição:** Esta é a versão estável da API de autenticação. Pode ser utilizada em projetos de produção ou testes.  
- **Observação:** Embora seja a versão “antiga”, ela está totalmente funcional e documentada.

## 2. node-auth
- **Status:** Em desenvolvimento.
- **Tecnologia:** Node.js (plain/Express ou outra stack)
- **Descrição:** Versão nova da API de autenticação, ainda incompleta. Não deve ser usada em produção.  

---

## Tecnologias utilizadas
- Node.js
- NestJS (para a versão `nestjs-auth-old`)
- [outras dependências específicas que o projeto usa]

---

## Instalação (para nestjs-auth-old)
```bash
# Clone o repositório
git clone git@github.com:LaurenceFluciano/auth-api.git
cd auth-api/nestjs-auth-old

# Instale as dependências
npm install

# Rodar a API
npm run start
