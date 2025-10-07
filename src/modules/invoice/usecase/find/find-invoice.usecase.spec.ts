import { InvoiceItem } from '../../domain/entities/invoice-items.entity'
import { Invoice } from '../../domain/entities/invoice.entity'
import { Address } from '../../domain/value-objects/Address'
import { FindInvoiceUseCase } from './find-invoice.usecase'

describe('Find Invoice test suit', () => {
  const invoiceItem = new InvoiceItem({ name: 'Item', price: 100 })
  const address = new Address({
    street: 'Rua',
    state: 'BA',
    number: '1223',
    complement: 'Complemento',
    zipCode: '12234',
    city: 'FSA',
  })
  const invoice = new Invoice({
    name: 'Invoice',
    address,
    items: [invoiceItem],
    createdAt: new Date(),
    updatedAt: new Date(),
    document: '123455',
  })

  const newInvoiceGateway = () => ({
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
  })

  it('shound find an invoice', async () => {
    const repository = newInvoiceGateway()
    const sut = new FindInvoiceUseCase(repository)

    const response = await sut.execute({ id: invoice.id.id })

    expect(response.id).toEqual(invoice.id.id)
    expect(response.document).toEqual(invoice.document)
    expect(response.total).toEqual(invoice.total)
    expect(response.name).toEqual(invoice.name)
    expect(response.createdAt).toEqual(invoice.createdAt)

    expect(response.address.city).toEqual(invoice.address.city)
    expect(response.address.state).toEqual(invoice.address.state)
    expect(response.address.street).toEqual(invoice.address.street)
    expect(response.address.complement).toEqual(invoice.address.complement)
    expect(response.address.number).toEqual(invoice.address.number)
    expect(response.address.zipCode).toEqual(invoice.address.zipCode)
  })
})
