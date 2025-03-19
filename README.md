# PROJETO HUBII API

# Organização da Estrutura
--------------------------------------------------------------------------------
- A estrutura MVC (Model-View-Controller) foi escolhida para organizar o projeto de forma clara e escalável. No entanto, para manter a separação de responsabilidades e facilitar a manutenção do código, foi adicionado um nível extra de Services.

- Controllers: Responsáveis por receber as requisições HTTP, validar os dados da entrada e chamar os serviços apropriados.
Dessa forma, os controladores ficam mais enxutos e focados na comunicação entre a API e o cliente.

- Services: Contêm toda a lógica de negócio da aplicação. Esse design evita que os controllers fiquem sobrecarregados com regras de validação e manipulação de dados, tornando o código mais modular e reutilizável.

- O Repository é uma camada intermediária entre as entidades e os serviços da aplicação. Ele encapsula a lógica de acesso ao banco de dados, fornecendo métodos para buscar, salvar, atualizar e excluir dados

- Entities: Representam a estrutura das entidades no banco de dados e são responsáveis pela interação com a camada de persistência

## Descrição do Projeto
- 📝 Descrição do Projeto
O projeto consiste em duas APIs que trabalham em conjunto para gerenciar produtos e pedidos de forma eficiente.

- ✅ Atualmente, o sistema utiliza o RabbitMQ para coordenar a comunicação entre os microserviços de Pedidos e Produtos, garantindo um fluxo de processamento assíncrono e escalável.

- 🛒 API de Produtos
- A API de Produtos oferece um CRUD completo para gerenciamento de produtos, permitindo:
- ✅ Criar, listar, atualizar e excluir produtos.
- ✅ Consultar produtos individualmente por identificador.
- ✅ Unifica e tras todos os produtos copilados, com totais por produto.
- ✅ Consultar todas as saidas ( vendas )

- 📦 API de Pedidos
- A API de Pedidos fornece funcionalidades relacionadas à logística e ao processamento de pedidos, incluindo:
- ✅ Consulta de frete por CEP, retornando o valor do envio, o prazo estimado (em dias) e a distância em quilômetros a partir de São Paulo.
- ✅ Integração com a API de Produtos para visualizar os itens disponíveis antes de efetuar um pedido.
- ✅ Pedidos, garantindo uma experiência fluida para o usuário.

- 🔗 Integração entre APIs:
A API de Produtos e a API de Pedidos trabalham juntas para permitir que os usuários consultem os produtos disponíveis, verifiquem as condições de entrega e realizem pedidos com base nos valores e prazos calculados. 🚀

## Como Funciona a Integração?
- 1️⃣ Pedido Criado 🛒 → Quando um cliente efetua um pedido, a API de Pedidos envia uma mensagem para a fila do RabbitMQ contendo as informações do pedido.
- 2️⃣ Processamento na Fila 📩 → A mensagem é armazenada na fila até que a API de Produtos a consuma.
- 3️⃣ Validação de Estoque 📦 → A API de Produtos recebe a mensagem, verifica se o produto existe e se há estoque suficiente.
- 4️⃣ Atualização de Estoque ✅ → Se o estoque for suficiente, o sistema reduz a quantidade do produto e registra a venda. Caso contrário, uma ação apropriada pode ser tomada (ex.: rejeitar o pedido ).

- 🚀 Por que usar RabbitMQ?
A utilização do RabbitMQ aproxima o projeto de um cenário real de microserviços, trazendo benefícios como:
- 🔹 Desacoplamento → As APIs funcionam de forma independente, reduzindo a dependência direta entre elas.
- 🔹 Escalabilidade → Como a comunicação é assíncrona, o sistema pode lidar com um grande volume de pedidos sem sobrecarregar os serviços.
- 🔹 Resiliência → Se a API de Produtos estiver temporariamente indisponível, os pedidos ainda serão armazenados na fila até serem processados.
- 🔹 Melhor Gerenciamento de Carga → Permite processar pedidos de forma controlada, evitando picos repentinos de requisições.

- Com essa abordagem, o sistema se torna mais modular, robusto e preparado para um ambiente distribuído, seguindo as melhores práticas para microserviços. 🚀

--------------------------------------------------------------------------------
# Tecnologias Utilizadas
- node.js
- postgresSql
- rabbitmq
- docker

## Principais bibliotecas
- express.js
- typeOrm
- jest
- axios
--------------------------------------------------------------------------------
# Passo a passo para rodar a aplicação

## Dentro do README de cada api, tem uma documentação da api e uma introdução de sua estrutura 

## 1. Clone o repositório:

git clone [https://github.com/darcioSoares/project-order](https://github.com/darcioSoares/project-order)
- cd project-order


## 2. Suba os containers com Docker: (Executar dentro da Raiz do projeto)

- Dentro da pasta do project-order, use o comando:

- docker compose build  ou docker compose build '--no-cache' 
- docker compose up -d (subir os containers)
- docker compose down (derrubar os containers)

Este comando irá subir os containers necessários para a aplicação.

#### 3. API Product - npm install, test e gerar migrations
 
- Entrar em no terminal de product
- docker exec -it api bash 
- npm install 
- npm run typeorm migration:run -- -d ./src/database/data-source.js
- npm test
- exit

#### 4. API Order Rodar - npm install e test

- Entrar em no terminal de order
- docker exec -it api-order bash 
- npm install 
- npm test
- exit

#### Restart apis
- docker compose restart api api-order 
- (Para evitar erro de conexão do rabbitmq)

--------------------------------------------------------------------------------
- (OBSERVAÇÃO - DEIXAR O LOGS DO Product ABERTO, PARA PODER VER A INTERAÇÃO COM RABBITMQ AO FAZER UM PEDIDO)
- docker logs api -f 
--------------------------------------------------------------------------------

## Comandos para aplicação
### Para entrar no bash da app e rodar os teste
- (observação - indentificação : api produtos se chama api e api pedidos api-order )
- docker exec -it api bash
- docker exec -it api-order bash
- npm test
