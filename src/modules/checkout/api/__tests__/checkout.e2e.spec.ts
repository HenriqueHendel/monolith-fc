import { Sequelize } from 'sequelize-typescript'
import express, { Express } from 'express'
import request from 'supertest'
import { migrator } from '../../../../migrations/migration-config/migrator'
import { ProductModel } from '../../../product-adm/repository/product.model'
import { Umzug } from 'umzug'
import { productAdmRoute } from '../../../product-adm/api/routes/product-adm.routes'
import { clientAdmRoute } from '../../../client-adm/api/routes/client-adm.routes'
import { checkoutRoute } from '../routes/checkout.routes'
import { ClientAdmFacadeFactory } from '../../../client-adm/factory/facade.factory'
import { ProductAdmFacadeFactory } from '../../../product-adm/factory/facade.factory'
import { ClientModel } from '../../../client-adm/repository/clent.model'
import { OrderModel } from '../../repository/order-model'
import { ClientModel as CheckoutClientModel } from '../../repository/client.model'
import { ProductModel as CheckoutProductModel } from '../../repository/product.model'
import { CatalogModel } from '../../../store-catalog/repository/product.model'
import { PaymentModel } from '../../../payment/repository/payment.model'
import InvoiceModel from '../../../invoice/repository/invoice.model'
import InvoiceItemModel from '../../../invoice/repository/invoice-item.model'

describe('Checkout E2E Test', () => {
  const app: Express = express()
  app.use(express.json())
  app.use('/products', productAdmRoute)
  app.use('/clients', clientAdmRoute)
  app.use('/checkout', checkoutRoute)

  let sequelize: Sequelize

  let migration: Umzug<any>

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    })

    sequelize.addModels([
      ProductModel,
      ClientModel,
      OrderModel,
      CheckoutClientModel,
      CheckoutProductModel,
      CatalogModel,
      PaymentModel,
      InvoiceModel,
      InvoiceItemModel
    ])
    migration = migrator(sequelize)
    await migration.up()
  })

  afterEach(async () => {
    if (!migration || !sequelize) {
      return
    }
    migration = migrator(sequelize)
    await migration.down()
    await sequelize.close()
  })
  it('should create a checkout', async () => {
    const clientFacade = ClientAdmFacadeFactory.create()
    const productFacade = ProductAdmFacadeFactory.create()

    const client = await clientFacade.addClient({
      name: 'John',
      email: 'john@mail.com',
      address: 'fake-address',
    })

    await productFacade.addProduct({
      name: 'Test product',
      description: 'test product',
      purchasePrice: 100,
      stock: 10,
      id: 'valid-id',
    })

    const response = await request(app)
      .post('/checkout')
      .send({
        clientId: client.id,
        products: [{ productId: 'valid-id' }],
      })

    expect(response.status).toBe(201)
  })
})
