import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Metadatum extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nft_id: number

  @column()
  public background: string

  @column()
  public body: string

  @column()
  public tail: string

  @column()
  public clothes: string

  @column()
  public back: string

  @column()
  public head: string

  @column()
  public mouth: string

  @column()
  public eyes: string

  @column()
  public side: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
