import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../repository/product.model'
import { ProductAdmFacadeFactory } from '../factory/facade.factory'

describe('Unit tests for ProductAdm facade', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const facade = ProductAdmFacadeFactory.create()

    await facade.addProduct({
      id: '1',
      name: 'Product',
      description: 'Product description',
      purchasePrice: 100,
      stock: 10,
    })

    const product = await ProductModel.findOne({ where: { id: '1' } })

    expect(product.id).toBe('1')
    expect(product.name).toBe('Product')
    expect(product.description).toBe('Product description')
    expect(product.purchasePrice).toBe(100)
    expect(product.stock).toBe(10)
  })
})
