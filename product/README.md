# Projeto backend API Pedidos (Order)

Esta é a estrutura do Projeto.
```plaintext
/backend
│── /src
│   │ Pasta principal que organiza todo o código-fonte da aplicação
│   │ 
│   ├── /controllers
│   │ Lida com as requisições HTTP, chamando os serviços e retornando respostas.
│   │ 
│   ├── /routes
│   │ Define os endpoints e direciona as requisições para os controllers.
│   │ 
│   ├── /entities
│   │ As entidades representam a estrutura dos dados que a aplicação vai manipular.
│   │ 
│   ├── /repositories
│   │ Os repositórios são responsáveis por acessar os dados no banco de dados.
│   │ 
│   ├── /services
│   │ Contém a lógica de negócios e regras de processamento da aplicação.
│   │ 
│   ├── /tests
│   │ Armazena os testes automatizados para garantir o funcionamento do sistema
│   │ 
│   ├── server.js 
│   │ Arquivo raiz da aplicação
```
--------------------------------------------------------------------------------
## Informaçoes importantes para aplicação
- docker logs -f api (logs backend) 
- docker exec -it api bash (entrar no bash) Para consegui visualizar o consumo da fila
- npm test (teste) OBS Primeiro entre no bash docker exec -it api bash depois execulte o comando

# Observação
- Api Produtos, tem integração com DB, pois é a api responsavel pelo CRUD dos produtos e controle de estoque, dando baixa nos produtos e listando as saidas (vendas)

- docker exec -it api bash (entrar no bash) 
--------------------------------------------------------------------------------

# API Documentation

## Products Endpoints

### Criar Produto
**POST /products
```http
POST /journeys HTTP/1.1
Host: localhost:3000
Content-Type: application/json
exemplo: localhost:3000/products
```
#### Request Body
```json
{
  "name": "Monitor", - produto (case sensitive)
	"category" : "tecnologia", - categoria
  "price": 99.99, - valor
  "stock": 20  - quantidade inserida
}
```

### Atualizar Produto
**PUT /products/id
```http
PUT /journeys HTTP/1.1
Host: localhost:3000
Content-Type: application/json
exemplo: localhost:3000/products/10
```
#### Request Body
```json
{
	"name": "mesa",
	"category": "Moveis",
	"price": 99.99,
	"stock": 25
}
```

### Listar todos os produtos, 
**GET /products
```http
GET /employees HTTP/1.1
Host: localhost:3000
Content-Type: application/json
exemplo: localhost:3000/products
```

### Delete produto, 
**DELETE /products/id
```http
DELETE /employees HTTP/1.1
Host: localhost:3000
Content-Type: application/json
exemplo: localhost:3000/products/4
```

### Tras uma lista de todos os produtos em totais já somados.
**GET /products/totals
```http
GET /employees HTTP/1.1
Host: localhost:3000
exemplo: localhost:3000/products/totals
```
### Tras uma lista de todas as saidas (vendas).
**GET /products/products-sold
```http
GET /employees HTTP/1.1
Host: localhost:3000
exemplo: localhost:3000/products/products-sold
```



