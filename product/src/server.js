require('dotenv').config();
const express = require("express");
const prodRouter = require("./routes/productRoutes");
const consumeMessages = require("./services/rabbitmqConsumerService");

consumeMessages(); 

const { initializeDatabase } = require("./database/data-source");

const app = express();
const PORT = 3000;


app.use(express.json());

app.get("/", (_, res) => res.send("API Rodando - Produto"));

app.use("/products", prodRouter);


initializeDatabase()
  .then(() => {
    console.log("Banco de dados inicializado com sucesso!");
  
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro na inicialização do servidor:", error);
    process.exit(1); 
  });
