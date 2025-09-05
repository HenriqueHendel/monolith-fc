import { AddProductUseCase } from './add-product.usecase'

const mockProductRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
})

describe('Add Product use case unit test', () => {
  it('shoud add a product', async () => {
    const productRepository = mockProductRepository()
    const spy = jest.spyOn(productRepository, 'add')
    const useCase = new AddProductUseCase(productRepository)

    const input = {
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
    }

    const result = await useCase.execute(input)

    expect(spy).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.description).toBe(input.description)
    expect(result.purchasePrice).toBe(input.purchasePrice)
    expect(result.stock).toBe(input.stock)
  })
})
