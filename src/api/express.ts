import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../modules/product-adm/repository/product.model'
import { productAdmRoute } from '../modules/product-adm/api/routes/product-adm.routes'
import { clientAdmRoute } from '../modules/client-adm/api/routes/client-adm.routes'
import { ClientModel } from '../modules/client-adm/repository/clent.model'
import { checkoutRoute } from '../modules/checkout/api/routes/checkout.routes'

export const app: Express = express()
app.use(express.json())
app.use('/products', productAdmRoute)
app.use('/clients', clientAdmRoute)
app.use('/checkout', checkoutRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([ProductModel, ClientModel])
  await sequelize.sync()
}

setupDb()
