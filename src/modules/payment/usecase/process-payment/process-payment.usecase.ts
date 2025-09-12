import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { Transaction } from '../../domain/transaction.entity'
import { PaymentGateway } from '../../gateway/payment.gateway'
import {
  InputProcessPaymentDto,
  OutputProcessPaymentDto,
} from './process-payment.dto'

export class ProcessPaymentUseCase
  implements UseCaseInterface<InputProcessPaymentDto, OutputProcessPaymentDto>
{
  private _paymentRepository: PaymentGateway

  constructor(paymentRepository: PaymentGateway) {
    this._paymentRepository = paymentRepository
  }

  async execute(
    input: InputProcessPaymentDto,
  ): Promise<OutputProcessPaymentDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    })

    transaction.process()

    await this._paymentRepository.save(transaction)

    return {
      transactionId: transaction.id.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
  }
}
