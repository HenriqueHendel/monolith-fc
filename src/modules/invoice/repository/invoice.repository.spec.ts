import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from './invoice.model'
import InvoiceItemModel from './invoice-item.model'
import { InvoiceRepository } from './invoice.repository'
import { InvoiceItem } from '../domain/entities/invoice-items.entity'
import { Address } from '../domain/value-objects/Address'
import { Invoice } from '../domain/entities/invoice.entity'

describe('Invoice repository test suit', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should generate an invoice', async () => {
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

    const invoiceRepositoy = new InvoiceRepository()

    await invoiceRepositoy.generate(invoice)

    const invoiceCreated = await InvoiceModel.findOne({
      where: {
        id: invoice.id.id,
      },
    })

    expect(invoiceCreated.id).toEqual(invoice.id.id)
    expect(invoiceCreated.document).toEqual(invoice.document)
    expect(invoiceCreated.total).toBeDefined()
    expect(invoiceCreated.name).toEqual(invoice.name)

    expect(invoiceCreated.city).toEqual(invoice.address.city)
    expect(invoiceCreated.state).toEqual(invoice.address.state)
    expect(invoiceCreated.street).toEqual(invoice.address.street)
    expect(invoiceCreated.complement).toEqual(invoice.address.complement)
    expect(invoiceCreated.number).toEqual(invoice.address.number)
    expect(invoiceCreated.zipCode).toEqual(invoice.address.zipCode)
  })

  it('should find an invoice', async () => {
    const data = {
      id: '1',
      name: 'Invoice',
      document: '12334555',
      street: 'Street',
      state: 'BA',
      number: '12345',
      complement: 'Complement',
      zipCode: 'Zip Code',
      city: 'City',
      items: [
        {
          id: '123',
          name: 'Item',
          price: 100,
        },
      ],
      total: 100,
    }
    await InvoiceModel.create(data)

    const repository = new InvoiceRepository()

    const invoice = await repository.find(data.id)

    expect(invoice.id.id).toEqual(data.id)
    expect(invoice.document).toEqual(data.document)
    expect(invoice.total).toBeDefined()
    expect(invoice.name).toEqual(data.name)

    expect(invoice.address.city).toEqual(data.city)
    expect(invoice.address.state).toEqual(data.state)
    expect(invoice.address.street).toEqual(data.street)
    expect(invoice.address.complement).toEqual(data.complement)
    expect(invoice.address.number).toEqual(data.number)
    expect(invoice.address.zipCode).toEqual(data.zipCode)
  })
})
