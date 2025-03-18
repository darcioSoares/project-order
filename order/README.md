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
- docker logs -f api-order (logs backend) 
- docker exec -it api-order bash (entrar no bash) Para consegui visualizar o consumo da fila
- npm test (teste) OBS Primeiro entre no bash docker exec -it api-order bash depois execulte o comando

# Observação
- Api pedidos, não a interação com DB, consumimos api produtos, para listar produtos por isso não há repositories nem entities.

- docker exec -it api-order bash (entrar no bash) Para consegui visualizar o consumo da fila e as msg
um passo alem, seria enviar por email, imformaçoes sobre o produto para o cliente. Mas só estou logando no temrinal.
--------------------------------------------------------------------------------

# API Documentation

## Orders Endpoints

### Consumindo a api de produtos, listar todos os produtos, 
**GET /orders/products**
```http
POST /employees HTTP/1.1
Host: localhost:3005
Content-Type: application/json
exemplo: localhost:3005/orders/products
```

### Consultar CEP, trazendo valor do frete, distancia e em km, considerando logistica em SP 
**GET orders/estimate/codezipe
```http
GET /employees HTTP/1.1
Host: localhost:3005
exemplo: localhost:3005/orders/products/13484-015
```

## Journeys Endpoints

### Efetuar pedido
**POST /orders/order
```http
POST /journeys HTTP/1.1
Host: localhost:3005
Content-Type: application/json
exemplo: localhost:3005/orders/order
```
#### Request Body
```json
{
  "product" : "Pc", - nome do produto (case sensitive)
  "amount" : 2      - quantidade do pedido
}
```

