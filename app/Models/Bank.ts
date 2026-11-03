import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bank extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orderId: number

  @column()
  public amount: string

  @column()
  public mode: string

  @column()
  public type: string

  @column()
  public token: string

  @column()
  public status: number

  @column()
  public message: string

  @column()
  public response: number

  @column()
  public final: string

  @column()
  public sale: string

  @column()
  public card: string

  @column()
  public pan: string

  @column()
  public reference: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
