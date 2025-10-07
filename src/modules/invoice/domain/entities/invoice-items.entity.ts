import { BaseEntity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'

interface InvoiceItemProps {
  id?: Id
  name: string
  price: number
}

export class InvoiceItem extends BaseEntity {
  private _name: string
  private _price: number

  constructor({ id, name, price }: InvoiceItemProps) {
    super(id)
    this._name = name
    this._price = price
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }
}
