import { AggregateRoot } from '../../../@shared/domain/entity/aggregate-root.interface'
import { BaseEntity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { InvoiceItem } from './invoice-items.entity'
import { Address } from '../value-objects/Address'

interface InvoiceProps {
  id?: Id
  name: string
  document: string
  address: Address
  items: InvoiceItem[]
  createdAt?: Date
  updatedAt?: Date
}

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _address: Address
  private _items: InvoiceItem[]

  constructor({
    id,
    name,
    document,
    address,
    items,
    createdAt,
    updatedAt,
  }: InvoiceProps) {
    super(id, createdAt, updatedAt)

    this._name = name
    this._document = document
    this._address = address
    this._items = items
  }

  get name() {
    return this._name
  }

  get document() {
    return this._document
  }

  get address() {
    return this._address
  }

  get items() {
    return this._items
  }

  get total() {
    return this._items.reduce((acc, cur) => {
      return (acc += cur.price)
    }, 0)
  }
}
