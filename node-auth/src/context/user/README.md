# Noções Básicas de Autentificação

Componentes de autentificação podem ser dividos nos seguintes fatores:

- **Fatores de Conhecimento:** Algo que somente o usuário sabe como um PIN e senha. 
- **Fatores de Posse:** Algo que o usuário possui como uma chave secreta ou dispositivo.
- **Fatores de Inerência:** Algo que o usuário é, como dados biométricos.
- **Fatores Comportamentais:** Algo que o usuário faz, como padrões de comportamento dentro do sistema.

Cada sistema de autentificação possui seu próprio **Gerenciamento de Identidade e Acesso (IAM)**. No entanto, é essencial seguir padrões consolidados, evitando fragmentação entre aplicações. Uma abordagem unificada para a identidade de uma entidade permite que o usuário seja autenticado em múltiplos serviços sem necessidade de sistemas isolados. Dentre eles, temos:

- **SSO (Single Sign-On):** Permite que um usuário se autentique uma única vez e acesse múltiplos sistemas ou serviços sem precisar logar novamente.

- **Federação de Identidade:** Integra diferentes domínios de autenticação, permitindo que usuários de sistemas externos sejam reconhecidos e autenticados sem criar novas credenciais.

- **Orquestração de Identidade:** Coordena múltiplos provedores de autenticação e métodos de login, garantindo uma experiência consistente ao usuário e facilitando a administração centralizada das políticas de acesso.

Na aplicação atual, o foco será no sistema **Single Sign-On (SSO)**. Em futuras releases da API, será essencial adicionar as diferentes formas de autentificação apresentadas nesta documentação.

## Tipos de Autentificação e sua importância para a aplicação

Gerar tokens de acesso sem entender com qual tipo de autentificação estamos trabalhando é um problema frequente em muitas APIs. Por isso, é essencial classificar os tipos de autentificação de forma ordenada, permitindo a criação de componentes reutilizáveis em qualquer instância.

Em outras palavras, uma arquitetura consistente de autentificação permite a criação de factories que resolvem as necessidades do contexto da aplicação. Dentre as opções, destacam-se:

- **Autentificação de um fator**
- **Autentificação de multiplo fator**
- **Autentificação adaptativa**
- **Autentificação sem senha**

Além de definir os tipos, um bom sistema permite escolher os métodos de autentificação mais convenientes para cada contexto. Integrar fatores de autentificação diferentes entre si exige conhecimento sólido, especialmente ao conectar partes de um sistema via **API REST**.

Respeitar os princípios de *Roy Fielding* é crucial: não basta criar múltiplas **URIs**. Cada contexto de aplicação exige um fator de autentificação sólido, e ter múltiplos fatores sem que todos sejam efetivamente utilizados é um erro arquitetônico.

## Outros tipos de autentificação

- **Security Assertion Markup Language (SAML):** Permite que aplicações e serviços compartilhem assertions de autenticação, garantindo que a identidade do usuário seja reconhecida entre sistemas diferentes.

- **OAuth e OpenID Connect (OIDC):** Protocolos que permitem autorização e autenticação de usuários em aplicações externas sem expor credenciais. OAuth foca em autorização, enquanto OIDC adiciona uma camada de autenticação sobre OAuth.

- **Kerberos:** Esquema de autenticação baseado em tickets, garantindo que usuários e serviços provem sua identidade de forma segura antes de acessar recursos da rede.

## Discussões relevante

A comunidade de desenvolvedores debate frequentemente dois paradigmas de autentificação: **stateful** e **stateless**.

São abordagens totalmente diferentes sobre como autenticar um usuário, e não existe uma convenção universal que determine qual é a melhor.

O contexto da aplicação, suas necessidades de escalabilidade, segurança e manutenção, é o que evidencia qual abordagem deve ser adotada.

Abaixo veja de forma simplificada, quais as diferenças entre ambos os paradigmas:

### Stateful 

No paradigma stateful, o servidor mantém o estado da sessão do usuário.

#### Vatangens:

- Controle centralizado da sessão.
- Possibilidade de revogar acessos em tempo real.
- Fácil de rastrear atividades do usuário.

#### Desvantagens:
- Escalabilidade limitada: requer sincronização entre servidores ou armazenamento compartilhado.
- Mais carga de memória/DB no servidor.

**Uso típico:** Aplicações internas, sistemas com poucas instâncias ou onde o controle de sessão centralizado é crítico.

### Stateless

O paradigma stateless, o servidor não mantém estado da sessão, respeitando uma das restrições arquitetônicas do **REST**.

#### Vatangens:

- Altamente escalável: qualquer servidor pode validar o token sem consultar outro.
- Menor custo de armazenamento no servidor.

#### Desvantagens:

- Revogação de tokens é mais complexa.
- Tokens longos podem ser mais pesados de transmitir.

**Uso típico:** APIs públicas, sistemas distribuídos, aplicações que precisam escalar horizontalmente.

# Tecnologias e Técncias

