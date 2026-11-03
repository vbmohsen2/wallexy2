import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Limit extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public number: string

  @column()
  public type: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

}
