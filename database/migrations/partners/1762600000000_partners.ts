import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Partners extends BaseSchema {
  protected tableName = 'partners'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('full_name').notNullable()
      table.string('phone').notNullable()
      table.string('store_name').notNullable()
      table.string('city').notNullable()
      table.string('activity_type').notNullable()
      table.string('tier').notNullable()
      table.string('card_file')
      table.string('store_file')
      table.string('status').notNullable().defaultTo('pending')
      table.text('note')
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
