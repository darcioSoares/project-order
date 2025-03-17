const productRepository = require('../repositories/productRepository');

const getProducts = async () => {
  return await productRepository.findAll();
};

const getProductById = async (id) => {
  return await productRepository.findById(id);
};

const createProduct = async (data) => {
  data.name = data.name.toLowerCase();
  return await productRepository.create(data);
};

const updateProduct = async (id, data) => {
  return await productRepository.update(id, data);
};

const deleteProduct = async (id) => {
  return await productRepository.remove(id);
};

const totailProduct = async (name) => {
  return await productRepository.totailProductSum(name);
};

const productsSumStock = async () => {
  return await productRepository.productsSumStock();
};

const productsSold = async () => {
  return await productRepository.productsSold();
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  totailProduct,
  productsSumStock,
  productsSold
};
