const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Product',
  tableName: 'products',
  columns: {
    id: { primary: true, type: 'int', generated: true },
    name: { type: 'varchar', nullable: false },
    category: { type: 'varchar', nullable: false },
    price: { type: 'decimal', nullable: false },
    stock: { type: 'int', nullable: false },
    created_at: { type: 'timestamp', createDate: true },
    updated_at: { type: 'timestamp', updateDate: true },
  },
});
