import { sequelize, app } from '../../../../api/express'
import request from 'supertest'
import { InvoiceFacadeFactory } from '../../factory/invoice.facade.factory'

describe('Invoice E2E Test Suit', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should find an invoice', async () => {
    const invoiceFactory = InvoiceFacadeFactory.create()

    const generatedInvoice = await invoiceFactory.generate({
      city: 'City',
      complement: 'Complement',
      document: '12345678',
      items: [
        {
          id: 'valid-id',
          name: 'Item name',
          price: 100,
        },
      ],
      name: 'Henrique',
      number: '234',
      state: 'State',
      street: 'Street',
      total: 100,
      zipCode: '1234566',
    })

    const invoice = await request(app)
      .get(`/invoices/${generatedInvoice.id}`)
      .send()

    expect(invoice.statusCode).toBe(200)
    expect(invoice.body.id).toBe(generatedInvoice.id)
  })
})
