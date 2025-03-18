import amqplib from "amqplib";

const RABBITMQ_URL = 'amqp://user:password@rabbitmq:5672'; 
const QUEUE_NAME = 'order_queue';

export const sendProductToQueue = async (product) => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();


    await channel.assertQueue(QUEUE_NAME, { durable: true });

    const message = JSON.stringify(product);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });

    console.log("🚀🚀🚀🚀 Produto enviado para a fila: 🌏🌏🌏🌏", product);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Erro ao enviar mensagem para RabbitMQ:", error);
  }
};
