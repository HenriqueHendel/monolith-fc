import { GenerateInvoiceUseCase } from './generate-invoice.usecase'

describe('Genereate Invoice UseCase Test Suit', () => {
  const newInvoiceRepository = () => ({
    find: jest.fn(),
    generate: jest.fn(),
  })

  it('should generate an invoice', async () => {
    const invoiceRepository = newInvoiceRepository()

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
    }

    const sut = new GenerateInvoiceUseCase(invoiceRepository)

    const response = await sut.execute(data)

    expect(response.id).toBeDefined()
    expect(response.document).toEqual(data.document)
    expect(response.total).toBeDefined()
    expect(response.name).toEqual(data.name)

    expect(response.city).toEqual(data.city)
    expect(response.state).toEqual(data.state)
    expect(response.street).toEqual(data.street)
    expect(response.complement).toEqual(data.complement)
    expect(response.number).toEqual(data.number)
    expect(response.zipCode).toEqual(data.zipCode)
  })
})
