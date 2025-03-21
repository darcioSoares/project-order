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

const totailProductSum = async (name) => {
  const productRepository = getProductRepository();
  
  const result = await productRepository.createQueryBuilder("product")
    .select("product.name", "Produto") 
    .addSelect("SUM(product.stock)", "Total")    
    .where("LOWER(product.name) = LOWER(:name)", { name })
    .groupBy("product.name") 
    .getRawOne();

  return result;
};

const productsSumStock = async () => {
  const productRepository = getProductRepository();
  
  const result = await productRepository.createQueryBuilder("product")
    .select("product.name")
    .addSelect("SUM(product.stock)", "total_stock")
    .groupBy("product.name")
    .getRawMany();

  return result;
};

const productsSold= async () => {
  const productRepository = getProductRepository();
  
  const result = await productRepository.createQueryBuilder("product")
  .select(["product.id", "product.name", "product.category", "product.price", "product.stock"])
  .where("product.stock < 0") 
  .getMany();

    return result;
};


module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  totailProductSum,
  productsSumStock,
  productsSold
};
