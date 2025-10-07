import {
  Table,
  Model,
  PrimaryKey,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import InvoiceModel from './invoice.model'

@Table({
  tableName: 'invoice-items',
  timestamps: false,
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  @ForeignKey(() => require('./invoice.model.ts').default)
  @Column
  declare invoice_id: string

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  @BelongsTo(() => require('./invoice.model.ts').default)
  declare invoice: InvoiceModel

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare price: number
}
