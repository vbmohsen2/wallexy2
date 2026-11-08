import {BaseModel, column, computed} from '@ioc:Adonis/Lucid/Orm'
import {DateTime} from 'luxon'

export default class Partner extends BaseModel {
  public static STATUS = {
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected',
  }

  @column({isPrimary: true})
  public id: number

  @column()
  public fullName: string

  @column()
  public phone: string

  @column()
  public storeName: string

  @column()
  public city: string

  @column()
  public activityType: string

  @column()
  public tier: string

  @column({serializeAs: null})
  public cardFile: string | null

  @column({serializeAs: null})
  public storeFile: string | null

  @column()
  public status: string

  @column()
  public note: string | null

  @computed({serializeAs: 'cardFile'})
  public get cardFileUrl() {
    return this.cardFile ? 'https://static.wallexy.ir' + this.cardFile : null
  }

  @computed({serializeAs: 'storeFile'})
  public get storeFileUrl() {
    return this.storeFile ? 'https://static.wallexy.ir' + this.storeFile : null
  }

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
