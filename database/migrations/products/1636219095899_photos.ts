import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Photos extends BaseSchema {
  protected tableName = 'photos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id' , 10).unsigned().references('products.id').onDelete('CASCADE')
      table.string('path')
      table.string('orginal')
      table.string('small')
      table.string('normal')
      table.string('large')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
