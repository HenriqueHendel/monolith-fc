import { Sequelize } from 'sequelize-typescript'
import { PaymentModel } from '../repository/payment.model'
import { PaymentfacadeFactory } from '../factory/facade.factory'

describe('Payment facade tests suit', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([PaymentModel])
    await sequelize.sync()
  })

  afterEach(async () => sequelize.close())

  it('shold process a payment', async () => {
    const facade = PaymentfacadeFactory.create()

    const input = {
      orderId: '1',
      amount: 100,
    }

    const payment = await facade.processPayment(input)

    const output = await PaymentModel.findOne({
      where: { id: payment.transactionId },
    })

    expect(output.id).toBeDefined()
    expect(output.amount).toBe(100)
    expect(output.status).toBe('approved')
    expect(output.orderId).toBe('1')
  })
})
