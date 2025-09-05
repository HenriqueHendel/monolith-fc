import { AggregateRoot } from '../../../@shared/domain/entity/aggregate-root.interface'
import { BaseEntity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'

interface ProductPros {
  id?: Id
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export class Product extends BaseEntity implements AggregateRoot {
  private _name: string
  private _description: string
  private _purchasePrice: number
  private _stock: number

  constructor({ id, name, description, purchasePrice, stock }: ProductPros) {
    super(id)
    this._name = name
    this._description = description
    this._purchasePrice = purchasePrice
    this._stock = stock
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get purchasePrice() {
    return this._purchasePrice
  }

  get stock() {
    return this._stock
  }
}
