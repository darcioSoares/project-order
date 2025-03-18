const axios = require('axios');
const rabbitmqService = require('../services/rabbitmqService');
const { getProducts, makeOrder, shippingEstimate } = require('../services/orderService');


jest.mock('axios');
jest.mock('../services/rabbitmqService', () => ({
  sendProductToQueue: jest.fn(),
}));

// Silenciar logs e erros durante os testes
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

describe('orderService', () => {
  describe('getProducts', () => {
    it('deve retornar dados de produtos quando a requisição for bem-sucedida', async () => {
      const mockData = { data: [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }] };
      axios.get.mockResolvedValue(mockData);

      const products = await getProducts();

      expect(products).toEqual(mockData.data);
    });

    it('deve retornar um array vazio quando ocorrer um erro', async () => {
      axios.get.mockRejectedValue(new Error('Erro ao buscar produtos'));

      const products = await getProducts();

      expect(products).toEqual([]);
    });
  });

  describe('makeOrder', () => {
    it('deve retornar sucesso ao enviar um pedido', async () => {
      const mockData = { success: true, message: "Pedido enviado com sucesso! Recebera um email com a confirmação do Pedidos", protocols: 12345 };
      rabbitmqService.sendProductToQueue.mockResolvedValue();

      const response = await makeOrder('Produto A', 3);

      expect(response.success).toBe(true);
      expect(response.message).toBe('Pedido enviado com sucesso! Recebera um email com a confirmação do Pedidos');
    });

    it('deve retornar erro ao falhar em enviar o pedido', async () => {
      rabbitmqService.sendProductToQueue.mockRejectedValue(new Error('Erro ao enviar pedido'));

      const response = await makeOrder('Produto A', 3);

      expect(response.success).toBe(false);
      expect(response.message).toBe('Erro ao processar pedido.');
    });
  });

  describe('shippingEstimate', () => {
    it('deve calcular corretamente o frete com sucesso', async () => {
      const mockCepData = {
        data: {
          location: {
            coordinates: {
              latitude: '-23.550520',
              longitude: '-46.633308',
            },
          },
          city: 'São Paulo',
          state: 'SP',
        },
      };

      axios.get.mockResolvedValue(mockCepData);

      const response = await shippingEstimate('01153000');

      expect(response.cep).toBe('01153000');
      expect(response.cidade).toBe('São Paulo');
      expect(response.estado).toBe('SP');
      expect(parseFloat(response.distanciaKm)).toBeGreaterThan(0);
      expect(parseFloat(response.valorFrete)).toBeGreaterThan(0);
      expect(response.prazoEntrega).toMatch(/\d+ dias/);
    });

    it('deve retornar erro se não encontrar dados do CEP', async () => {
      axios.get.mockRejectedValue(new Error('Erro ao calcular o frete'));

      const response = await shippingEstimate('01153000');

      expect(response.error).toBe('Falha ao obter dados do CEP');
    });
  });
});
