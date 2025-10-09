// import { ClientAdmFacadeInterface } from '../../../client-adm/facade/facade.interface'
import { InvoiceFacadeInterface } from '../../../invoice/facade/invoice.facade.interface'
import { PaymentFacadeInterface } from '../../../payment/facade/payment.facade.interface'
import { ProductAdmFacadeInterface } from '../../../product-adm/facade/product-adm.facade.interface'
import { StoreCatalogFacadeInterface } from '../../../store-catalog/facade/store-catalog.interface'
import { InputPlaceOrderDto } from './place-order.dto'
import { PlaceOrderUseCase } from './place-order.usecase'
const mockCheckoutRepository = {
  addOrder: jest.fn(),
  findOrder: jest.fn(),
}
const mockProductFacade: ProductAdmFacadeInterface = {
  checkStock: jest.fn(),
  addProduct: jest.fn(),
}
const mockClientFacade = {
  findClient: jest.fn().mockResolvedValue(true),
  addClient: jest.fn(),
}
const mockCatalogFacade: StoreCatalogFacadeInterface = {
  findProduct: jest.fn(),
  findAllProducts: jest.fn(),
}
const mockPaymentFacade: PaymentFacadeInterface = {
  processPayment: jest.fn(),
}
const mockInvoiceFacade: InvoiceFacadeInterface = {
  generate: jest.fn(),
  find: jest.fn(),
}

const placeOrderUseCase = new PlaceOrderUseCase({
  catalogFacade: mockCatalogFacade,
  checkoutRepository: mockCheckoutRepository,
  clientFacade: mockClientFacade,
  paymentFacade: mockPaymentFacade,
  invoiceFacade: mockInvoiceFacade,
  productFacade: mockProductFacade,
})

describe('Place Order Usecase Unit test', () => {
  describe('ValideProducts method', () => {
    it('should throw error if no product are selected', async () => {
      const input: InputPlaceOrderDto = {
        clientId: '1',
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrowError()
    })

    it('should throw an error when product is out of stock', async () => {
      jest
        .spyOn(mockProductFacade, 'checkStock')
        .mockImplementation(({ productId }: { productId: string }) =>
          Promise.resolve({
            productId,
            stock: productId === '1' ? 0 : 1,
          }),
        )

      let input: InputPlaceOrderDto = {
        clientId: '0',
        products: [{ productId: '1' }],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error('Product 1 is not available on stock'),
      )

      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error('Product 1 is not available on stock'),
      )
      expect(mockProductFacade.checkStock).toBeCalledTimes(3)

      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }, { productId: '2' }],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error('Product 1 is not available on stock'),
      )
      expect(mockProductFacade.checkStock).toBeCalledTimes(5)
    })
  })

  describe('Execute method', () => {
    it('should throw an error when client not found', async () => {
      jest.spyOn(mockClientFacade, 'findClient').mockResolvedValueOnce(null)

      const input: InputPlaceOrderDto = {
        clientId: '0',
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error('Client not found'),
      )
    })

    it('should throw an error when products are not valid', async () => {
      const validateProductsSpy = jest
        // @ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, 'validateProducts')

      const input: InputPlaceOrderDto = {
        clientId: '1',
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error('No products selected'),
      )
      expect(validateProductsSpy).toHaveBeenCalledTimes(1)
    })
  })
})
