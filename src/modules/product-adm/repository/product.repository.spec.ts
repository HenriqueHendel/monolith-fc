import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from './product.model'
import { Product } from '../domain/entity/product.entity'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { ProductRepository } from './product.repository'

describe('Product repository test', () => {
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
    const product = new Product({
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
    })

    const productRepository = new ProductRepository()
    await productRepository.add(product)

    const productOnDatabase = await ProductModel.findOne({
      where: { id: product.id.id },
    })

    expect(productOnDatabase.id).toEqual(product.id.id)
    expect(productOnDatabase.name).toEqual(product.name)
    expect(productOnDatabase.description).toEqual(product.description)
    expect(productOnDatabase.purchasePrice).toEqual(product.purchasePrice)
    expect(productOnDatabase.stock).toEqual(product.stock)
  })

  it('should find a product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product',
      description: 'Product description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const productRepository = new ProductRepository()
    const output = await productRepository.find('1')

    expect(output.id.id).toEqual('1')
    expect(output.name).toEqual('Product')
    expect(output.description).toEqual('Product description')
    expect(output.purchasePrice).toEqual(100)
    expect(output.stock).toEqual(10)
  })
})
