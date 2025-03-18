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

const makeOrder = async (product, amount) => {
  try {
    
    product = product.trim(); 
    const protocols = Math.floor(10000 + Math.random() * 90000);

    const data = {product, amount, protocols}

    console.log("Enviando pedido para a fila:", data);
    await rabbitmqService.sendProductToQueue(data);
    
    return { success: true,
       message: "Pedido enviado com sucesso! Recebera um email com a confirmação do Pedidos",
       protocols : protocols 
      };

  } catch (error) {
    console.error("Erro ao processar pedido:", error.message);
    return { success: false, message: "Erro ao processar pedido." };
  }
};

const shippingEstimate = async (zipCode) => {

  //cep 01153 000 ---- CT em são Paulo (origem)
  const origem = {
    latitude: -23.53134247702593,
    longitude: -46.652559956179324
  };
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${zipCode}`);

    if (!response.data.location) {
      throw new Error("Não foi possível obter coordenadas do CEP");
    }

    const destino = {
      latitude: parseFloat(response.data.location.coordinates.latitude),
      longitude: parseFloat(response.data.location.coordinates.longitude)
    };

    const distancia = calculateDistance(origem.latitude, origem.longitude, destino.latitude, destino.longitude);
    const valorFrete = 5 + distancia; // 1 por km

    const prazoEntrega = Math.ceil(distancia / 10);

    console.log("resultado Distância: ", distancia);

    return {
      cep:   zipCode,
      cidade: response.data.city,
      estado: response.data.state,
      distanciaKm: distancia.toFixed(2), 
      valorFrete: valorFrete.toFixed(2), 
      prazoEntrega: `${prazoEntrega} dias`,
      centroDistribuicao: "São Paulo - SP",
      descricao: "A cada 10km adciona 1 dia no prazo de entrega, valor do frete R$5 + R$1 por km",
      transportadora: "Transportadora X"
    };

  } catch (error) {
    console.error("Erro ao calcular o frete:", error.message);
    return { error: "Falha ao obter dados do CEP" };
  }
}


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

module.exports = {
    getProducts,
    makeOrder,
    shippingEstimate
};