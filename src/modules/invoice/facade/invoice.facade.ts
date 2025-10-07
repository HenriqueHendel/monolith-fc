import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import {
  InputFindInvoiceUseCaseDto,
  OutputFindInvoiceUseCaseDTO,
} from '../usecase/find/find-invoice.dto'
import {
  InputGenerateInvoiceUseCaseDto,
  OutputGenerateInvoiceUseCaseDto,
} from '../usecase/generate/generate-invoice.dto'
import {
  InputGenerateInvoiceFacadeDto,
  InvoiceFacadeInterface,
  OutputFindInvoiceFacadeDto,
  OutputGenerateInvoiceFacadeDto,
} from './invoice.facade.interface'

type FindInvoiceUseCaseInterface = UseCaseInterface<
  InputFindInvoiceUseCaseDto,
  OutputFindInvoiceUseCaseDTO
>

type GenerateInvoiceUseCaseInterface = UseCaseInterface<
  InputGenerateInvoiceUseCaseDto,
  OutputGenerateInvoiceUseCaseDto
>

export interface InvoiceFacadeProps {
  find: FindInvoiceUseCaseInterface
  generate: GenerateInvoiceUseCaseInterface
}

export class InvoiceFacade implements InvoiceFacadeInterface {
  private _findInvoiceUseCase: FindInvoiceUseCaseInterface
  private _generateInvoiceUseCase: GenerateInvoiceUseCaseInterface

  constructor(props: InvoiceFacadeProps) {
    this._findInvoiceUseCase = props.find
    this._generateInvoiceUseCase = props.generate
  }

  async find(id: string): Promise<OutputFindInvoiceFacadeDto> {
    return this._findInvoiceUseCase.execute({ id })
  }

  async generate(
    input: InputGenerateInvoiceFacadeDto,
  ): Promise<OutputGenerateInvoiceFacadeDto> {
    return this._generateInvoiceUseCase.execute(input)
  }
}
