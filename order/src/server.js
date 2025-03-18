require("dotenv").config();
const express = require("express");
const orderRouter = require("./routes/orderRouters");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.get("/", (_, res) => res.send("API Rodando  Pedidos"));

app.use("/orders", orderRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });