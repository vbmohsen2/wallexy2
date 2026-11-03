import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Histories extends BaseSchema {
  protected tableName = 'histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id' , 10).unsigned().notNullable().references('users.id').onDelete('CASCADE')
      table.string('type').notNullable()
      table.bigInteger('identify').unsigned().notNullable()
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
