import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryProducts extends BaseSchema {
  protected tableName = 'category_product'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned().references('categories.id')
      table.integer('product_id').unsigned().references('products.id')
      table.unique(['category_id', 'product_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
