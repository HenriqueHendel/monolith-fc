import 'reflect-metadata'
import {
  Column,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { ClientModel } from './client.model'
import { ProductModel } from './product.model'

@Table({ tableName: 'checkout-orders', timestamps: false })
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @HasOne(() => ClientModel, { foreignKey: 'orderId' })
  declare client: ClientModel

  @HasMany(() => ProductModel, { foreignKey: 'orderId' })
  declare products: ProductModel[]

  @Column({ allowNull: false })
  declare status: string

  @Column({ allowNull: false })
  declare createdAt: Date

  @Column({ allowNull: false })
  declare updatedAt: Date
}
