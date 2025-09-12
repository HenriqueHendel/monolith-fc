import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import {
  InputProcessPaymentDto,
  OutputProcessPaymentDto,
} from '../usecase/process-payment/process-payment.dto'
import {
  InputProcessPaymentFacadeDto,
  OutputProcessPaymentFacadeDto,
  PaymentFacadeInterface,
} from './payment.facade.interface'

export class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUseCase: UseCaseInterface<
    InputProcessPaymentDto,
    OutputProcessPaymentDto
  >

  constructor(
    processPaymentUseCase: UseCaseInterface<
      InputProcessPaymentDto,
      OutputProcessPaymentDto
    >,
  ) {
    this._processPaymentUseCase = processPaymentUseCase
  }

  async processPayment(
    input: InputProcessPaymentFacadeDto,
  ): Promise<OutputProcessPaymentFacadeDto> {
    return this._processPaymentUseCase.execute(input)
  }
}
