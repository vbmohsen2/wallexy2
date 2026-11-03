import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Like extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public userId: number

  @column()
  public commentId: number

  @column()
  public like: number

  @column()
  public dislike: number

}
