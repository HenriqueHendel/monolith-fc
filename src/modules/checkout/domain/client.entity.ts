import { AggregateRoot } from '../../@shared/domain/entity/aggregate-root.interface'
import { BaseEntity } from '../../@shared/domain/entity/base.entity'
import { Id } from '../../@shared/domain/value-object/id.value-object'

interface ClientProps {
  id?: Id
  name: string
  email: string
  address: string
}

export class Client extends BaseEntity implements AggregateRoot {
  private _name: string
  private _email: string
  private _address: string

  constructor({ name, email, address, id }: ClientProps) {
    super(id)
    this._name = name
    this._email = email
    this._address = address
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get address() {
    return this._address
  }
}
