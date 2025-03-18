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

    const estimate = await orderService.shippingEstimate(zipcode);
    return res.status(200).json(estimate);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

const getOrder = async (req, res) => {
  try {
    const estimate = await orderService.makeOrder('sofa',1);
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
  