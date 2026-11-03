import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Prices extends BaseSchema {
  protected tableName = 'prices'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('model_id').unsigned().references('models.id').onDelete('CASCADE')
      table.string('price').notNullable()
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
