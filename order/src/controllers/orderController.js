const orderService = require('../services/orderService');

const getProducts = async (req, res) => {
  try {
    const products = await orderService.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

const getShippingEstimate = async (req, res) => {
  try {
    const { zipcode } = req.params;

    if (!zipcode ) return res.status(400).json({ message: 'Falta CEP para consulta' });

    const estimate = await orderService.shippingEstimate(zipcode);
    return res.status(200).json(estimate);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

const getOrder = async (req, res) => {
  try {
    const { product, amount } = req.body;
    if (!product || !amount ) return res.status(400).json({ message: 'Falta de dados para o criar pedidos' });

    const estimate = await orderService.makeOrder(product, amount);
    return res.status(200).json(estimate);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

module.exports = {
    getProducts,
    getShippingEstimate,
    getOrder
  };
  