import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class History extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public type: string

  @column()
  public identify: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
