const productService = require('../services/productService');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produto', error });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name,category, price, stock } = req.body;

    if(!name || !category || !price || !stock){
      return res.status(400).json({ message: 'Dados inválidos' });
    }

    const newProduct = await productService.createProduct({ name, category, price, stock });
    
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar produto', error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const updatedProduct = await productService.updateProduct(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar produto', error });
  }
};

const totalsProducts = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: 'Produto inválido' });
    }

    const result = await productService.totailProduct(name);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

const productsSumStock = async (req, res) => {
  try {
   
    const result = await productService.productsSumStock();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

const productsSold = async (req, res) => {
  try {
   
    const result = await productService.productsSold();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  totalsProducts,
  productsSumStock,
  productsSold
};
