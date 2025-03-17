const express = require("express");

const app = express();
const PORT = process.env.PORT || 3005;

app.get("/", (_, res) => res.send("API Rodando  Pedidos"));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });