const { AppDataSource } = require("../database/data-source"); 
const Product = require("../entities/Product"); 

const getProductRepository = () => {
  return AppDataSource.getRepository(Product);
};

const findAll = async () => {
  const productRepository = getProductRepository();
  return await productRepository.find();
};

const findById = async (id) => {
  const productRepository = getProductRepository();
  return await productRepository.findOneBy({ id });
};

const create = async (data) => {
  const productRepository = getProductRepository();
  const newProduct = productRepository.create(data);
  return await productRepository.save(newProduct);
};

const update = async (id, data) => {
  const productRepository = getProductRepository();
  let product = await productRepository.findOneBy({ id });

  if (!product) return null;

  Object.assign(product, data);
  return await productRepository.save(product);
};

const remove = async (id) => {
  const productRepository = getProductRepository();
  const product = await productRepository.findOneBy({ id });

  if (product) {
    await productRepository.remove(product);
    return true;
  }
  return false;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
