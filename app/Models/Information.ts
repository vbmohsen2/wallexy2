import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Information extends BaseModel {

  @column({isPrimary: true})
  public id: number

  @column()
  public userId: number

  @column()
  public card: string

  @column()
  public post: string

  @column()
  public irid: string

  @column()
  public plate: number

  @column()
  public address: string

  @column()
  public province: string

  @column()
  public city: string

  @column()
  public floor: number


  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
