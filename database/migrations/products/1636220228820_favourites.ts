import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Favourites extends BaseSchema {
  protected tableName = 'favourites'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE')
      table.integer('user_id').unsigned().index()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
