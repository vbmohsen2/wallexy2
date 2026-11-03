import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('parent_id' , 10)
      table.string('name')
      table.string('price')
      table.string('image')
      table.json('filters')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
