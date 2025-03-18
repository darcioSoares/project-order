const axios = require("axios");
const rabbitmqService = require('../services/rabbitmqService');

const getProducts = async () => {
  try {
    const response = await axios.get("http://api:3000/products");
    return response.data; 

  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return []; 
  }
};

const shippingEstimate = async () => {
  try {
    // const { cepDestino } = req.query;
    
    // if (!cepDestino) {
    //   return res.status(400).json({ error: "CEP de destino é obrigatório" });
    // }

    let cepDestino ='13484-015'
    console.log("Calculando frete para o CEP:", cepDestino);
    

    // Nova API de consulta de CEP (BrasilAPI)
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepDestino}`);

    // Simulação de valores (substitua por API real de frete)
    const shippingEstimate = {
      cepDestino,
      cidade: response.data.city,
      estado: response.data.state,
      valorFrete: 19.90,  // Exemplo fixo
      prazoEntrega: "4 dias úteis",
      transportadora: "Transportadora X",
    };

    // aqui e service não dever retorna res arrumar 
    ////////////////////

    return shippingEstimate;
  } catch (error) {
    console.error("Erro ao calcular frete:", error.message);
    return { error: "Falha ao obter estimativa de frete" };
  }
};

const makeOrder = async (product, amount) => {
  try {
    if (!product || !amount) {
      throw new Error("Produto inválido ou ausente.");
    }

    const data = {product, amount}

    console.log("Enviando pedido para a fila:", data);
    await rabbitmqService.sendProductToQueue(data);
    
    return { success: true, message: "Pedido enviado para a fila com sucesso!" };

  } catch (error) {
    console.error("Erro ao processar pedido:", error.message);
    return { success: false, message: "Erro ao processar pedido." };
  }
};

module.exports = {
    getProducts,
    makeOrder,
    shippingEstimate
};