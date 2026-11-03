import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Informations extends BaseSchema {
  protected tableName = 'information'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id' , 10).unsigned().references('users.id').onDelete('CASCADE')
      table.string('card' , 16).notNullable()
      table.string('irid' , 10).notNullable()
      table.string('plate').notNullable()
      table.string('address').notNullable()
      table.string('province').notNullable()
      table.string('city').notNullable()
      table.string('floor').nullable()
      table.string('post' ,10).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
