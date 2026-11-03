import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sell extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
}
