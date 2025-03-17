require("dotenv").config();
const express = require("express");

const Redis = require("ioredis");

const { initializeDatabase } = require("./database/data-source");

const app = express();
const PORT = process.env.PORT || 3000;


const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

redis.on("connect", () => console.log("🔥 Redis conectado!"));

app.use(express.json());

app.get("/", (_, res) => res.send("API Rodando  darcio"));



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
