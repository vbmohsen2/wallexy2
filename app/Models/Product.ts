import {DateTime} from 'luxon'
import Category from "App/Models/Category";
import Model from "App/Models/Model";
import Photo from "App/Models/Photo";
import Comment from "App/Models/Comment";
import Favourite from "App/Models/Favourite";

import Sell from 'App/Models//Sell';
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import View from "App/Models/View";

export default class Product extends BaseModel {

  @column({isPrimary: true})
  public id: number

  @column()
  public categoryId: number

  @column()
  public name: string

  @column()
  public normalized: string

  @column()
  public price: string

  @column()
  public type: string

  @column()
  public code: string

  @column()
  public codes: string

  @column()
  public description: string

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

  @hasMany(() => Model, {
    onQuery(query) {
      query.orderByRaw('ABS(price::int)')
    }
  })
  public models: HasMany<typeof Model>

  @hasOne(() => Model, {
    onQuery(query) {
      query.orderByRaw('ABS(price::int)')
    }
  })
  public model: HasOne<typeof Model>

  @hasMany(() => Photo)
  public photos: HasMany<typeof Photo>

  @hasOne(() => Photo)
  public photo: HasOne<typeof Photo>

  @hasMany(() => Comment, {
    onQuery(query) {
      query.where('state', 2).withCount('likes').withCount('dislikes')
    }
  })
  public comments: HasMany<typeof Comment>

  @hasOne(() => Comment, {
    onQuery(query) {
      query.where('state', 2)
    }
  })
  public score: HasOne<typeof Comment>

  @column({
    prepare: (value: Array<string>) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value)
  })
  public features: Array<string>

  @hasOne(() => Favourite)
  public favourites: HasOne<typeof Favourite>

  @hasMany(() => Sell)
  public sells: HasMany<typeof Sell>

  @hasMany(() => View)
  public views: HasMany<typeof View>

  @column({
    prepare: (value: Array<object>) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value)
  })
  public headers: Array<object>

  @column()
  public filters: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

}
