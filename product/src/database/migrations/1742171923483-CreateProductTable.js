module.exports = class CreateProductTable1742171923483 {
    async up(queryRunner) {
   
      await queryRunner.query(`
        CREATE TABLE "products" (
          "id" SERIAL NOT NULL, 
          "name" VARCHAR NOT NULL, 
          "category" VARCHAR, 
          "price" DOUBLE PRECISION, 
          "stock" INT NOT NULL, 
          "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_product_id" PRIMARY KEY ("id")
        )
      `);
    }
  
    async down(queryRunner) {
     
      await queryRunner.query(`DROP TABLE "products"`);
    }
  };
  