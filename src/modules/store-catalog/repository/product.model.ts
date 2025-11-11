import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  modelName: 'catalog-table',
  tableName: 'products',
  timestamps: true,
})
export class CatalogModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare description: string

  @Column({ allowNull: false })
  declare salesPrice: number
}
