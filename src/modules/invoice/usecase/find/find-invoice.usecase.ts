import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { InvoiceGateway } from '../../gateway/invoice.gateway'
import {
  InputFindInvoiceUseCaseDto,
  OutputFindInvoiceUseCaseDTO,
} from './find-invoice.dto'

export class FindInvoiceUseCase
  implements
    UseCaseInterface<InputFindInvoiceUseCaseDto, OutputFindInvoiceUseCaseDTO>
{
  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute({
    id,
  }: InputFindInvoiceUseCaseDto): Promise<OutputFindInvoiceUseCaseDTO> {
    const invoice = await this._invoiceRepository.find(id)

    const invoiceItems = invoice.items.map((item) => ({
      id: item.id.id,
      name: item.name,
      price: item.price,
    }))

    return {
      id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoiceItems,
      createdAt: invoice.createdAt,
      total: invoice.total,
    }
  }
}
