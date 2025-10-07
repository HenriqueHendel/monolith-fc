import { Column, Model, HasMany, PrimaryKey, Table } from 'sequelize-typescript'
import InvoiceItemModel from './invoice-item.model'

@Table({
  tableName: 'invoices',
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare document: string

  @Column({ allowNull: false })
  declare street: string

  @Column({ allowNull: false })
  declare number: string

  @Column({ allowNull: false })
  declare state: string

  @Column({ allowNull: false })
  declare complement: string

  @Column({ allowNull: false })
  declare city: string

  @Column({ allowNull: false })
  declare zipCode: string

  @Column({ allowNull: false })
  declare total: number

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  @HasMany(() => require('./invoice-item.model.ts').default)
  declare items: InvoiceItemModel[]
}
