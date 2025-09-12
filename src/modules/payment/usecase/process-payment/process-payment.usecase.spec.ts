import { Transaction } from '../../domain/transaction.entity'
import { PaymentGateway } from '../../gateway/payment.gateway'
import { ProcessPaymentUseCase } from './process-payment.usecase'

const mockPaymentRepository = (): PaymentGateway => ({
  save: jest.fn(),
})

describe('Process payment usecase tests suit', () => {
  it('should process a transaction with status approved', async () => {
    const transaction = new Transaction({
      amount: 100,
      orderId: '1',
    })

    const paymentRepository = mockPaymentRepository()
    const spy = jest.spyOn(paymentRepository, 'save')

    spy.mockResolvedValue(Promise.resolve(transaction))

    const useCase = new ProcessPaymentUseCase(paymentRepository)

    const output = await useCase.execute(transaction)

    expect(output.transactionId).toBeDefined()
    expect(output.amount).toBe(transaction.amount)
    expect(output.orderId).toBe(transaction.orderId)
    expect(output.status).toBe('approved')
  })

  it('should process a transaction with status declined', async () => {
    const transaction = new Transaction({
      amount: 90,
      orderId: '1',
    })

    const paymentRepository = mockPaymentRepository()
    const spy = jest.spyOn(paymentRepository, 'save')

    spy.mockResolvedValue(Promise.resolve(transaction))

    const useCase = new ProcessPaymentUseCase(paymentRepository)

    const output = await useCase.execute(transaction)

    expect(output.transactionId).toBeDefined()
    expect(output.amount).toBe(transaction.amount)
    expect(output.orderId).toBe(transaction.orderId)
    expect(output.status).toBe('declined')
  })

  it('should throw error when amount is less than zero', () => {
    const paymentRepository = mockPaymentRepository()
    const useCase = new ProcessPaymentUseCase(paymentRepository)

    const input = { amount: 0, orderId: '1' }

    expect(useCase.execute(input)).rejects.toBeInstanceOf(Error)
  })
})
