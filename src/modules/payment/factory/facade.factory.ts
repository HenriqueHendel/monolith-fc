import { PaymentFacade } from '../facade/payment.facade'
import { PaymentFacadeInterface } from '../facade/payment.facade.interface'
import { PaymentRepository } from '../repository/payment.repository'
import { ProcessPaymentUseCase } from '../usecase/process-payment/process-payment.usecase'

export class PaymentfacadeFactory {
  static create(): PaymentFacadeInterface {
    const repository = new PaymentRepository()
    const useCase = new ProcessPaymentUseCase(repository)

    return new PaymentFacade(useCase)
  }
}
