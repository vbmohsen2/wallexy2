import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Bag from "App/Models/Bag";
import Bank from './Bank';
import User from './User';

export default class Order extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public userId: number

  @column()
  public state: number

  @column()
  public bank: number

  @column()
  public address: string

  @column()
  public days: string

  @column()
  public tracking: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Bag)
  public bags: HasMany<typeof Bag>

  @hasMany(() => Bank)
  public banks: HasMany<typeof Bank>

  @column.dateTime({autoCreate: false})
  public paidAt: DateTime

  @column.dateTime({autoCreate: true})
  public cancelAt: DateTime

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
