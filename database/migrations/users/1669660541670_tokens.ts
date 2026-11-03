import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 10).unsigned().notNullable().references('users.id').onDelete('CASCADE')
      table.string('value', 4).notNullable()
      table.timestamp('created_at', {useTz: true})
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
