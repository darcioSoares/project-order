
const amqplib = require('amqplib');
const productService = require('./productService');

const RABBITMQ_URL = 'amqp://user:password@rabbitmq:5672';
const QUEUE_NAME = 'order_queue';

const consumeMessages = async () => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log("🎧 Aguardando mensagens da fila...");

    channel.consume(QUEUE_NAME, async  (msg) => {
      if (msg !== null) {
        const product = JSON.parse(msg.content.toString());
        console.log("📥 Produto recebido:", product);

        let result = await productService.totailProduct(product.product);

        console.log(result, product.product)

        if(!result){
            console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨");
            console.log("Produto não encontrado!", product.product);
            console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨");
            return channel.ack(msg);
        }

        let total = Number(result.Total)

        //garantir que seja sempre positivo
        if(total < Math.abs(product.amount)){
          console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨");
          console.log("Estoque insuficiente para essa operação!");  
          console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨");
          
          return channel.ack(msg);
        }

        product.price = 99.99;
        product.category = "Geral";
        product.stock = -Math.abs(product.amount)
        product.name = product.product;
        await productService.createProduct(product);
               
        console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅")
        console.log("Produto atualizado com sucesso!", product);
        console.log("Receberar um Email com as informaçoes do seu produto segue protocolo", product.protocols);
        console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅")
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Erro ao consumir mensagens:", error);
  }
};

module.exports = consumeMessages;
