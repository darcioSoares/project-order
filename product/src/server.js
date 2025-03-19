require('dotenv').config();
const express = require("express");
const prodRouter = require("./routes/productRoutes");

setTimeout(() => {
  console.log("Iniciando o consumidor de mensagens...");
  const consumeMessages = require("./services/rabbitmqConsumerService");
  consumeMessages();
}, 10000); 

const { initializeDatabase } = require("./database/data-source");

const app = express();
const PORT = 3000;


app.use(express.json());

app.get("/", (_, res) => res.send("API Rodando - Produto"));

app.use("/products", prodRouter);

setTimeout(async ()  => {
  await initializeDatabase();
}, 5000); 

app.listen(PORT, async ()  => {  
  console.log(`Servidor rodando na porta ${PORT}`);
});
