import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 10).unsigned().references('users.id').onDelete('CASCADE')
      table.string('address').nullable()
      table.string('tracking').nullable()
      table.string('days').nullable()
      table.tinyint('state', 1).defaultTo(1)
      table.tinyint('bank', 1).defaultTo(0)
      table.timestamp('paid_at', { useTz: true })
      table.timestamp('cancel_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
