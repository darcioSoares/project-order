module.exports = class CreateProductTable1742171923483 {
    async up(queryRunner) {
   
      await queryRunner.query(`
        CREATE TABLE "products" (
          "id" SERIAL NOT NULL, 
          "name" VARCHAR NOT NULL, 
          "category" VARCHAR NOT NULL, 
          "price" DOUBLE PRECISION NOT NULL, 
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
  