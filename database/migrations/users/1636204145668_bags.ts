import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bags extends BaseSchema {
  protected tableName = 'bags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id', 10).unsigned().notNullable().references('orders.id').onDelete('CASCADE')
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.string('model').notNullable();
      table.string('photo').notNullable();
      table.string('price').notNullable();
      table.string('change').defaultTo(0).notNullable();
      table.integer('max').unsigned().notNullable();
      table.integer('width').unsigned().defaultTo(0);
      table.integer('height').unsigned().defaultTo(0);
      table.integer('count').unsigned().notNullable();
      table.bigInteger('pid').unsigned().notNullable();
      table.tinyint('percent', 2).unsigned().notNullable();
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
