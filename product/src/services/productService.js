const productRepository = require('../repositories/productRepository');

const getProducts = async () => {
  return await productRepository.findAll();
};

const getProductById = async (id) => {
  return await productRepository.findById(id);
};

const createProduct = async (data) => {
  return await productRepository.create(data);
};

const updateProduct = async (id, data) => {
  return await productRepository.update(id, data);
};

const deleteProduct = async (id) => {
  return await productRepository.remove(id);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
