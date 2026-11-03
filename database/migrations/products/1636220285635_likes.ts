import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Likes extends BaseSchema {
  protected tableName = 'likes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('comment_id').unsigned().references('comments.id').onDelete('CASCADE')
      table.integer('user_id').unsigned().index()
      table.boolean('like')
      table.boolean('dislike')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
