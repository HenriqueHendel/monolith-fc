import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../modules/product-adm/repository/product.model'
import { productAdmRoute } from '../modules/product-adm/api/routes/product-adm.routes'
import { clientAdmRoute } from '../modules/client-adm/api/routes/client-adm.routes'
import { ClientModel } from '../modules/client-adm/repository/clent.model'
import { checkoutRoute } from '../modules/checkout/api/routes/checkout.routes'
import InvoiceModel from '../modules/invoice/repository/invoice.model'
import InvoiceItemModel from '../modules/invoice/repository/invoice-item.model'
import { invoiceRoute } from '../modules/invoice/api/routes'

export const app: Express = express()
app.use(express.json())
app.use('/products', productAdmRoute)
app.use('/clients', clientAdmRoute)
app.use('/checkout', checkoutRoute)
app.use('/invoices', invoiceRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([
    ProductModel,
    ClientModel,
    InvoiceModel,
    InvoiceItemModel,
  ])
  await sequelize.sync()
}

setupDb()
