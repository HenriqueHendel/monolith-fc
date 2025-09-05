import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { Product } from '../../domain/product.entity'
import { FindProductUseCase } from './find-product.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product',
  description: 'Product description',
  salesPrice: 100,
})

const mockProductsRepository = () => ({
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
})

describe('Unit test for find product use case', () => {
  it('should find a product', async () => {
    const productsRepository = mockProductsRepository()
    const usecase = new FindProductUseCase(productsRepository)

    const output = await usecase.execute({ id: product.id.id })

    expect(output.id).toEqual(product.id.id)
    expect(output.name).toEqual(product.name)
    expect(output.description).toEqual(product.description)
    expect(output.salesPrice).toEqual(product.salesPrice)
  })
})
