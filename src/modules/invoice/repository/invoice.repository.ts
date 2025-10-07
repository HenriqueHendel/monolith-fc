import { Id } from '../../@shared/domain/value-object/id.value-object'
import { InvoiceItem } from '../domain/entities/invoice-items.entity'
import { Invoice } from '../domain/entities/invoice.entity'
import { Address } from '../domain/value-objects/Address'
import { InvoiceGateway } from '../gateway/invoice.gateway'
import InvoiceItemModel from './invoice-item.model'
import InvoiceModel from './invoice.model'

export class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: 'items',
    })

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        state: invoice.state,
        street: invoice.street,
        complement: invoice.complement,
        zipCode: invoice.zipCode,
        number: invoice.number,
        city: invoice.city,
      }),
      items: invoice.items.map(
        (item) =>
          new InvoiceItem({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          }),
      ),
    })
  }

  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        state: invoice.address.state,
        number: invoice.address.number,
        complement: invoice.address.complement,
        zipCode: invoice.address.zipCode,
        city: invoice.address.city,
        items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        total: invoice.total,
      },
      {
        include: [{ model: InvoiceItemModel }],
      },
    )
  }
}
