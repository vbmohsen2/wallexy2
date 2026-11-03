import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Photo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column({ serializeAs: null })
  public path: string

  @column({ serializeAs: null })
  public orginal: string

  @column({ serializeAs: null })
  public small: string

  @column({ serializeAs: null })
  public normal: string

  @column({ serializeAs: null })
  public large: string

  @computed({serializeAs : 'orginal'})
  public get orginalPath() {
    return 'https://static.wallexy.ir' + this.path + this.orginal
  }

  @computed({serializeAs : 'small'})
  public get smallPath() {
    return 'https://static.wallexy.ir' + this.path + this.small
  }

  @computed({serializeAs : 'normal'})
  public get normalPath() {
    return 'https://static.wallexy.ir' + this.path + this.normal
  }

  @computed({serializeAs : 'large'})
  public get largePath() {
    return 'https://static.wallexy.ir' + this.path + this.large
  }


}
