const productController = require('../controllers/productController');
const productService = require('../services/productService');

jest.mock('../services/productService');

const mockRequest = (params = {}, body = {}) => ({ params, body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Product Controller', () => {
  test('getProducts deve retornar lista de produtos', async () => {
    const req = mockRequest();
    const res = mockResponse();
    productService.getProducts.mockResolvedValue([{ id: 1, name: 'Produto Teste' }]);

    await productController.getProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Produto Teste' }]);
  });

  test('getProductById deve retornar produto pelo ID', async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();
    productService.getProductById.mockResolvedValue({ id: 1, name: 'Produto Teste' });

    await productController.getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Produto Teste' });
  });

  test('createProduct deve criar um produto e retornar sucesso', async () => {
    const req = mockRequest({}, { name: 'Produto Teste', category: 'Categoria', price: 100, stock: 10 });
    const res = mockResponse();
    productService.createProduct.mockResolvedValue({ id: 1, name: 'Produto Teste', category: 'Categoria', price: 100, stock: 10 });

    await productController.createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Produto Teste', category: 'Categoria', price: 100, stock: 10 });
  });
});
