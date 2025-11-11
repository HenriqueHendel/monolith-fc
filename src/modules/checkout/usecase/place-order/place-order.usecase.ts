import { error } from 'console'
import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { ClientAdmFacadeInterface } from '../../../client-adm/facade/facade.interface'
import { InvoiceFacadeInterface } from '../../../invoice/facade/invoice.facade.interface'
import { PaymentFacadeInterface } from '../../../payment/facade/payment.facade.interface'
import { ProductAdmFacadeInterface } from '../../../product-adm/facade/product-adm.facade.interface'
import { StoreCatalogFacadeInterface } from '../../../store-catalog/facade/store-catalog.interface'
import { Client } from '../../domain/client.entity'
import { Order } from '../../domain/order.entity'
import { Product } from '../../domain/product.entity'
import { CheckoutGateway } from '../../gateway/checkout.gateway'
import { InputPlaceOrderDto, OutputPlaceOrderDto } from './place-order.dto'

interface PlaceOrderUseCaseProps {
  checkoutRepository: CheckoutGateway
  clientFacade: ClientAdmFacadeInterface
  productFacade: ProductAdmFacadeInterface
  catalogFacade: StoreCatalogFacadeInterface
  paymentFacade: PaymentFacadeInterface
  invoiceFacade: InvoiceFacadeInterface
}

export class PlaceOrderUseCase
  implements UseCaseInterface<InputPlaceOrderDto, OutputPlaceOrderDto>
{
  private _checkoutRepository: CheckoutGateway
  private _clientFacade: ClientAdmFacadeInterface
  private _productFacade: ProductAdmFacadeInterface
  private _catalogFacade: StoreCatalogFacadeInterface
  private _paymentFacade: PaymentFacadeInterface
  private _invoiceFacade: InvoiceFacadeInterface

  constructor({
    checkoutRepository,
    clientFacade,
    productFacade,
    catalogFacade,
    paymentFacade,
    invoiceFacade,
  }: PlaceOrderUseCaseProps) {
    this._checkoutRepository = checkoutRepository
    this._clientFacade = clientFacade
    this._productFacade = productFacade
    this._catalogFacade = catalogFacade
    this._paymentFacade = paymentFacade
    this._invoiceFacade = invoiceFacade
  }

  async execute(input: InputPlaceOrderDto): Promise<OutputPlaceOrderDto> {
      const client = await this._clientFacade.findClient({ id: input.clientId })
      console.log(client)
      if (!client) {
        throw new Error('Client not found')
      }
  
      const validateProducts = await this.validateProducts(input)
  
      if (validateProducts.error) {
        throw new Error(validateProducts.message)
      }
  
      const products = await Promise.all(
        input.products.map(({ productId }) => this.getProduct(productId)),
      )
  
      const orderClient = new Client({
        id: new Id(client.id),
        name: client.name,
        email: client.email,
        address: client.address,
      })
  
      const order = new Order({
        client: orderClient,
        products,
      })
  
      const processPayment = await this._paymentFacade.processPayment({
        orderId: order.id.id,
        amount: order.total,
      })
  
      const invoice =
        processPayment.status === 'approved'
          ? await this._invoiceFacade.generate({
              name: orderClient.name,
              document: 'document',
              street: orderClient.address,
              state: orderClient.address,
              city: orderClient.address,
              complement: orderClient.address,
              zipCode: orderClient.address,
              items: products.map((product) => ({
                id: product.id.id,
                name: product.name,
                price: product.salesPrice,
              })),
              number: orderClient.address,
              total: order.total,
            })
          : null
  
      processPayment.status === 'approved' && order.approve()
      await this._checkoutRepository.addOrder(order)
  
      return {
        id: order.id.id,
        invoiceId: processPayment.status === 'approved' ? invoice.id : null,
        status: order.status,
        total: order.total,
        products: products.map((product) => ({
          productId: product.id.id,
        })),
      }
  }

  private async validateProducts(input: InputPlaceOrderDto) {
    if (input.products.length === 0) {
      return {
        error: true,
        message: 'No products selected',
      }
    }

    for (const item of input.products) {
      const product = await this._productFacade.checkStock({
        productId: item.productId,
      })

      if (product.stock <= 0) {
        return {
          error: true,
          message: `Product ${product.productId} is not available on stock`,
        }
      }
    }

    return {
      error: false,
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    try {
      const product = await this._catalogFacade.findProduct({ id: productId })
      if (!product) {
        throw new Error('Product not found')
      }
      const productProps = {
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice ?? 100,
      }
      return new Product(productProps)
    } catch (error) {
      console.log('Error on get products => ', error)
      throw new Error('Error on get products')
    }
  }
}
