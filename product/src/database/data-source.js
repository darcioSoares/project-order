const { DataSource } = require("typeorm");
const Product = require("../entities/Product");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "user",
  password: "password",
  database: "mydb",
  synchronize: true,
  logging: true,
  entities: [Product],
});

const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados foi bem-sucedida!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};

module.exports = { AppDataSource, initializeDatabase };
