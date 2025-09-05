import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { Product } from '../../domain/product.entity'
import { FindAllProductsUseCase } from './find-all-products.usecase'

const productOne = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Product 1 description',
  salesPrice: 100,
})

const productTwo = new Product({
  id: new Id('2'),
  name: 'Product 2',
  description: 'Product 2 description',
  salesPrice: 200,
})

const mockProductsRepository = () => ({
  findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
  find: jest.fn(),
})

describe('Test for find all products use case', () => {
  it('should find all products', async () => {
    const productRepository = mockProductsRepository()
    const useCase = new FindAllProductsUseCase(productRepository)

    const { products } = await useCase.execute({})

    expect(products).toHaveLength(2)
    expect(products[0].id).toBe(productOne.id.id)
    expect(products[0].name).toBe(productOne.name)
    expect(products[0].description).toBe(productOne.description)
    expect(products[0].salesPrice).toBe(productOne.salesPrice)
    expect(products[1].id).toBe(productTwo.id.id)
    expect(products[1].name).toBe(productTwo.name)
    expect(products[1].description).toBe(productTwo.description)
    expect(products[1].salesPrice).toBe(productTwo.salesPrice)
  })
})
