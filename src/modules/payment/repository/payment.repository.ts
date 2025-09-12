import { Transaction } from '../domain/transaction.entity'
import { PaymentGateway } from '../gateway/payment.gateway'
import { PaymentModel } from './payment.model'

export class PaymentRepository implements PaymentGateway {
  async save(transaction: Transaction): Promise<Transaction> {
    await PaymentModel.create({
      id: transaction.id.id,
      amount: transaction.amount,
      status: transaction.status,
      orderId: transaction.orderId,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    })

    return transaction
  }
}
