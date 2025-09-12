import { Sequelize } from 'sequelize-typescript'
import { PaymentModel } from './payment.model'
import { Transaction } from '../domain/transaction.entity'
import { PaymentRepository } from './payment.repository'

describe('Payment repository tests suit', () => {
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

  afterEach(async () => await sequelize.close())

  it('should save a transaction', async () => {
    const transaction = new Transaction({
      orderId: '1',
      amount: 100,
    })

    const repository = new PaymentRepository()

    await repository.save(transaction)

    const transactionDb = await PaymentModel.findOne({
      where: { id: transaction.id.id },
    })

    expect(transactionDb.id).toBe(transaction.id.id)
    expect(transactionDb.amount).toBe(transaction.amount)
    expect(transactionDb.status).toBe(transaction.status)
    expect(transactionDb.orderId).toBe(transaction.orderId)
    expect(transactionDb.createdAt).toStrictEqual(transaction.createdAt)
    expect(transactionDb.updatedAt).toStrictEqual(transaction.updatedAt)
  })
})
