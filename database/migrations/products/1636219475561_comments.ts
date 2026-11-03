import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE')
      table.integer('user_id').unsigned().index()
      table.string('title').notNullable()
      table.text('text').notNullable()
      table.text('answer')
      table.float('score').defaultTo(0)
      table.tinyint('buyer', 1).defaultTo(0)
      table.tinyint('state', 1).defaultTo(0)
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
