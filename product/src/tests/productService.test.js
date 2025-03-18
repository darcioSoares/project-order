const productService = require('../services/productService');
const productRepository = require('../repositories/productRepository');

jest.mock('../repositories/productRepository'); // Mock do repositório

describe('Product Service', () => {
  test('getProducts deve retornar lista de produtos', async () => {
    productRepository.findAll.mockResolvedValue([{ id: 1, name: 'Produto Teste' }]);

    const result = await productService.getProducts();

    expect(result).toEqual([{ id: 1, name: 'Produto Teste' }]);
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
  });

  test('getProductById deve retornar produto pelo ID', async () => {
    const id = 1;
    productRepository.findById.mockResolvedValue({ id, name: 'Produto Teste' });

    const result = await productService.getProductById(id);

    expect(result).toEqual({ id, name: 'Produto Teste' });
    expect(productRepository.findById).toHaveBeenCalledWith(id);
  });

  test('createProduct deve criar um produto com nome em minúsculas', async () => {
    const data = { name: 'Produto Teste', category: 'Categoria', price: 100, stock: 10 };
    productRepository.create.mockResolvedValue({ ...data, name: 'produto teste' });

    const result = await productService.createProduct(data);

    expect(result).toEqual({ ...data, name: 'produto teste' });
    expect(productRepository.create).toHaveBeenCalledWith(data);
  });

  test('updateProduct deve atualizar o produto', async () => {
    const id = 1;
    const data = { name: 'Produto Atualizado', price: 200 };
    productRepository.update.mockResolvedValue({ id, ...data });

    const result = await productService.updateProduct(id, data);

    expect(result).toEqual({ id, ...data });
    expect(productRepository.update).toHaveBeenCalledWith(id, data);
  });

  test('deleteProduct deve deletar o produto', async () => {
    const id = 1;
    productRepository.remove.mockResolvedValue(true);

    const result = await productService.deleteProduct(id);

    expect(result).toBe(true);
    expect(productRepository.remove).toHaveBeenCalledWith(id);
  });

  test('totailProduct deve retornar a soma do total de produtos', async () => {
    const name = 'produto teste';
    productRepository.totailProductSum.mockResolvedValue(100);

    const result = await productService.totailProduct(name);

    expect(result).toBe(100);
    expect(productRepository.totailProductSum).toHaveBeenCalledWith(name);
  });

  test('productsSumStock deve retornar a soma do estoque', async () => {
    productRepository.productsSumStock.mockResolvedValue(500);

    const result = await productService.productsSumStock();

    expect(result).toBe(500);
    expect(productRepository.productsSumStock).toHaveBeenCalledTimes(1);
  });

  test('productsSold deve retornar o total de produtos vendidos', async () => {
    productRepository.productsSold.mockResolvedValue(150);

    const result = await productService.productsSold();

    expect(result).toBe(150);
    expect(productRepository.productsSold).toHaveBeenCalledTimes(1);
  });
});
