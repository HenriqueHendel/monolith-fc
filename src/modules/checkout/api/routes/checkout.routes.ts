import express, { Request, Response } from 'express'
import { PlaceOrderUseCase } from '../../usecase/place-order/place-order.usecase'
import { CheckoutRepository } from '../../repository/checkout.repository'
import { ClientAdmFacadeFactory } from '../../../client-adm/factory/facade.factory'
import { StoreCatalogFacadeFactory } from '../../../store-catalog/factory/facade.factory'
import { ProductAdmFacadeFactory } from '../../../product-adm/factory/facade.factory'
import { PaymentfacadeFactory } from '../../../payment/factory/facade.factory'
import { InvoiceFacadeFactory } from '../../../invoice/factory/invoice.facade.factory'

export const checkoutRoute = express.Router()

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const checkoutRepository = new CheckoutRepository()
  const clientFacade = ClientAdmFacadeFactory.create()
  const catalogFacade = StoreCatalogFacadeFactory.create()
  const productFacade = ProductAdmFacadeFactory.create()
  const paymentFacade = PaymentfacadeFactory.create()
  const invoiceFacade = InvoiceFacadeFactory.create()

  const placeOrderUseCase = new PlaceOrderUseCase({
    checkoutRepository,
    clientFacade,
    catalogFacade,
    productFacade,
    paymentFacade,
    invoiceFacade,
  })

  try {
    const placeOrderData = {
      clientId: req.body.clientId,
      products: req.body.products,
    }

    const client = await placeOrderUseCase.execute(placeOrderData)

    res.status(201).send(client)
  } catch (error) {
    res.status(500).send(error)
  }
})
