import { Column, PrimaryKey, Table, Model } from 'sequelize-typescript'

@Table({
  tableName: 'transactions',
  timestamps: false,
})
export class PaymentModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare orderId: string

  @Column({ allowNull: false })
  declare amount: number

  @Column({ allowNull: false })
  declare status: string

  @Column({ allowNull: false })
  declare createdAt: Date

  @Column({ allowNull: false })
  declare updatedAt: Date
}
