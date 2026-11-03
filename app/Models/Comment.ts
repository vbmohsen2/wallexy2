import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, computed, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Like from "App/Models/Like";
import User from "App/Models/User";
import Product from "App/Models/Product";

export default class Comment extends BaseModel {

   public serializeExtras = true

  @column({isPrimary: true})
  public id: number

  @column()
  public userId: number

  @column()
  public productId: number

  @column()
  public title: string

  @column()
  public text: string

  @column()
  public answer: string

  @column({serializeAs : null})
  public score: number

  @computed()
  public get rating() {
    return  this.score
  }
  @column()
  public buyer: number

  @column()
  public state: number

  @hasMany(() => Like, {
    onQuery(query) {
      query.whereNotNull('like')
    }
  })
  public likes: HasMany<typeof Like>

  @hasMany(() => Like, {
    onQuery(query) {
      query.whereNotNull('dislike')
    }
  })
  public dislikes: HasMany<typeof Like>

  @belongsTo(() => User, {
    onQuery(query) {
      query.select('first_name', 'last_name' , 'number')
    }
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    onQuery(query) {
      query.select('first_name', 'last_name' )
    }
  })
  public extra: BelongsTo<typeof User>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
