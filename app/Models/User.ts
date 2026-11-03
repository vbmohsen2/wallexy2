import {DateTime} from 'luxon'
import {column, BaseModel, HasOne, hasOne, HasMany, hasMany, computed} from '@ioc:Adonis/Lucid/Orm'
import Token from "App/Models/Token";
import Order from "App/Models/Order";
import Information from "App/Models/Information";
import Favourite from "App/Models/Favourite";
import Comment from "App/Models/Comment";
import History from "App/Models/History";
import Notification from "App/Models/Notification";


export default class User extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public number: string

  @column()
  public type: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public rememberMeToken: string | null

  @hasOne(() => Token)
  public token: HasOne<typeof Token>

  @computed({serializeAs : 'name'})
  public get name(){
    return this.firstName + ' ' + this.lastName
  }

  @hasOne(() => Order, {
    onQuery(query) {
      query.where('state', 1).orWhere('state' , 100)
    }
  })
  public basket: HasOne<typeof Order>

  @hasOne(() => Information)
  public information: HasOne<typeof Information>

  @hasMany(() => Order, {
    onQuery(query) {
      query.orderBy('created_at', 'desc')
    }
  })
  public orders: HasMany<typeof Order>

  @hasMany(() => Favourite)
  public favourites: HasMany<typeof Favourite>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => History)
  public histories: HasMany<typeof History>

  @hasMany(() => Notification)
  public notifications: HasMany<typeof Notification>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

}
