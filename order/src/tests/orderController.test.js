const orderController = require('../controllers/orderController');
const orderService = require('../services/orderService');

jest.mock('../services/orderService');

const mockRequest = (params = {}, body = {}) => ({ params, body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Order Controller', () => {
  test('getProducts deve retornar lista de produtos', async () => {
    const req = mockRequest();
    const res = mockResponse();
    orderService.getProducts.mockResolvedValue([{ id: 1, name: 'Produto Teste' }]);

    await orderController.getProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Produto Teste' }]);
  });

  test('getShippingEstimate deve retornar estimativa de frete', async () => {
    const req = mockRequest({ zipcode: '12345678' });
    const res = mockResponse();
    orderService.shippingEstimate.mockResolvedValue({ price: 10, days: 5 });

    await orderController.getShippingEstimate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ price: 10, days: 5 });
  });

  test('getOrder deve criar um pedido e retornar sucesso', async () => {
    const req = mockRequest({}, { product: 'Produto Teste', amount: 2 });
    const res = mockResponse();
    orderService.makeOrder.mockResolvedValue({ success: true });

    await orderController.getOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});