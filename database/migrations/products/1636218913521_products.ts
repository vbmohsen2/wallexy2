import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned().index()
      table.string('name').notNullable()
      table.string('normalized').notNullable()
      table.string('type').notNullable()
      table.string('code')
      table.string('codes')
      table.string('price')
      table.text('headers' , 'mediumtext')
      table.text('filters' , 'mediumtext')
      table.text('features' , 'mediumtext')
      table.text('description', 'longtext')
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
