import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'banks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id', 10).unsigned().references('orders.id').onDelete('CASCADE')
      table.string('amount').notNullable()
      table.string('mode').notNullable()
      table.string('type')
      table.string('status')
      table.string('token')
      table.string('message')
      table.string('code')
      table.string('final')
      table.string('sale')
      table.string('pan')
      table.string('card')
      table.string('reference')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
