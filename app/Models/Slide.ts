import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Slide extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public path: string

  @column()
  public link: string

  @column()
  public text: string

}
