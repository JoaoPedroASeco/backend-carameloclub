import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Metadata extends BaseSchema {
  protected tableName = 'metadata'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.integer('galleries_id').unsigned().references('galleries.id').onDelete('CASCADE')
      table.string('background', 255).notNullable()
      table.string('body', 255).notNullable()
      table.string('tail', 255).notNullable()
      table.string('clothes', 255).notNullable()
      table.string('back', 255).notNullable()
      table.string('head', 255).notNullable()
      table.string('mouth', 255).notNullable()
      table.string('eyes', 255).notNullable()
      table.string('side', 255).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
