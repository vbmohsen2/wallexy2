import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orderId: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public model: string

  @column()
  public photo: string

  @column()
  public price: string

  @column()
  public change: string

  @column()
  public max: number

  @column()
  public count: number

  @column()
  public pid: number

  @column()
  public percent: number

  @column()
  public width: number

  @column()
  public height: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
