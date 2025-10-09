import { BaseEntity } from '../../@shared/domain/entity/base.entity'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Client } from './client.entity'
import { Product } from './product.entity'

interface OrderProps {
  id?: Id
  client: Client
  products: Product[]
  status?: string
}

export class Order extends BaseEntity {
  private _client: Client
  private _products: Product[]
  private _status: string

  constructor({ id, client, products, status }: OrderProps) {
    super(id)
    this._client = client
    this._products = products
    this._status = status || 'pending'
  }

  approve() {
    this._status = 'approved'
  }

  get client() {
    return this._client
  }

  get products() {
    return this._products
  }

  get status() {
    return this._status
  }

  get total() {
    return this._products.reduce((acc, product) => acc + product.salesPrice, 0)
  }
}
