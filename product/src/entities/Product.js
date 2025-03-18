const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Product',
  tableName: 'products',
  columns: {
    id: { primary: true, type: 'int', generated: true },
    name: { type: 'varchar', nullable: false },
    category: { type: 'varchar', nullable: true },
    price: { type: 'decimal', nullable: true },
    stock: { type: 'int', nullable: false },
    created_at: { type: 'timestamp', createDate: true },
    updated_at: { type: 'timestamp', updateDate: true },
  },
});
