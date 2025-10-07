import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from '../repository/invoice.model'
import InvoiceItemModel from '../repository/invoice-item.model'
import { InvoiceFacadeFactory } from '../factory/invoice.facade.factory'

describe('Invoice Facade test suit', () => {
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

  it('should create an invoice', async () => {
    const facade = InvoiceFacadeFactory.create()

    const data = {
      name: 'Invoice',
      document: '1233455',
      street: 'Rua',
      number: '12344',
      complement: 'Complemento',
      city: 'FSA',
      state: 'BA',
      zipCode: '12234',
      items: [
        {
          id: '123',
          name: 'Item',
          price: 1000,
        },
      ],
      total: 100,
    }

    const createdInvoice = await facade.generate(data)

    const result = await InvoiceModel.findOne({
      where: { id: createdInvoice.id },
    })

    expect(result.id).toBeDefined()
    expect(result.document).toEqual(data.document)
    expect(result.total).toBeDefined()
    expect(result.name).toEqual(data.name)

    expect(result.city).toEqual(data.city)
    expect(result.state).toEqual(data.state)
    expect(result.street).toEqual(data.street)
    expect(result.complement).toEqual(data.complement)
    expect(result.number).toEqual(data.number)
    expect(result.zipCode).toEqual(data.zipCode)
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

    const facade = InvoiceFacadeFactory.create()

    const invoice = await facade.find(data.id)

    expect(invoice.id).toBe(data.id)
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
