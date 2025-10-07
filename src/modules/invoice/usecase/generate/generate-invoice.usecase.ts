import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { InvoiceItem } from '../../domain/entities/invoice-items.entity'
import { Invoice } from '../../domain/entities/invoice.entity'
import { Address } from '../../domain/value-objects/Address'
import { InvoiceGateway } from '../../gateway/invoice.gateway'
import {
  InputGenerateInvoiceUseCaseDto,
  OutputGenerateInvoiceUseCaseDto,
} from './generate-invoice.dto'

export class GenerateInvoiceUseCase
  implements
    UseCaseInterface<
      InputGenerateInvoiceUseCaseDto,
      OutputGenerateInvoiceUseCaseDto
    >
{
  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(
    input: InputGenerateInvoiceUseCaseDto,
  ): Promise<OutputGenerateInvoiceUseCaseDto> {
    const address = new Address({
      street: input.street,
      state: input.state,
      city: input.city,
      complement: input.complement,
      number: input.number,
      zipCode: input.zipCode,
    })

    const invoiceItems = input.items.map(
      (item) =>
        new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        }),
    )

    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address,
      items: invoiceItems,
    })

    await this._invoiceRepository.generate(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      state: invoice.address.state,
      street: invoice.address.street,
      complement: invoice.address.complement,
      number: invoice.address.number,
      zipCode: invoice.address.zipCode,
      city: invoice.address.city,
      items: invoice.items.map((invoiceItem) => ({
        id: invoiceItem.id.id,
        name: invoiceItem.name,
        price: invoiceItem.price,
      })),
      total: invoice.total,
    }
  }
}
