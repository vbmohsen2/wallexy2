import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";

export default class Category extends BaseModel {

  public serializeExtras = true

  @column({isPrimary: true})
  public id: number

  @column()
  public parentId: number

  @column()
  public name: string

  @column()
  public photo: string

  @column()
  public price: string

  @column({
    prepare: (value: Array<any>) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  public filters: Array<any>

  @belongsTo(() => Category, {
    foreignKey: 'parentId',
    onQuery(query) {
      query.preload('parent')
    }
  })
  public parent: BelongsTo<typeof Category>

  @hasMany(() => Category, {
    foreignKey: 'parentId',
    onQuery(query) {
      query.preload('children')
    }
  })
  public children: HasMany<typeof Category>

  @hasMany(() => Category)
  public child: HasMany<typeof Category>

  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>

}
