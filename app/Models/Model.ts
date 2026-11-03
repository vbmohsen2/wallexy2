
import { BaseModel, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Price from "App/Models/Price";
import {DateTime} from "luxon";

export default class Model extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column()
  public name: string

  @column()
  public price: string

  @computed({serializeAs : 'calculated'})
  public get calculated(): string {
    return (parseInt(this.price) * (1 - (this.percent / 100))).toFixed().toString()
  }

  @hasMany(() => Price)
  public prices: HasMany<typeof Price>

  @column()
  public percent: number

  @column()
  public count: number

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

}
