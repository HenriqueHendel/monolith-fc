import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { Product } from '../../domain/entity/product.entity'
import { CheckStockUseCase } from './check-stock.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product',
  description: 'Product description',
  purchasePrice: 100,
  stock: 10,
})

const mockProductRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
})

describe('Unit test for check product', () => {
  it('should get the stock of a product', async () => {
    const repository = mockProductRepository()
    const useCase = new CheckStockUseCase(repository)

    const output = await useCase.execute({ productId: product.id.id })

    expect(repository.find).toHaveBeenCalled()
    expect(output.productId).toBe(product.id.id)
    expect(output.stock).toBe(product.stock)
  })
})
