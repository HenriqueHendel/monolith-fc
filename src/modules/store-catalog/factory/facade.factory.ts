import { StoreCatalogFacade } from '../facade/store-catalog.facade'
import { ProductRepository } from '../repository/product.repository'
import { FindAllProductsUseCase } from '../usecase/find-all-products/find-all-products.usecase'
import { FindProductUseCase } from '../usecase/find-product/find-product.usecase'

export class StoreCatalogFacadeFactory {
  static create() {
    const productsRepository = new ProductRepository()
    const findAllProductsUseCase = new FindAllProductsUseCase(
      productsRepository,
    )
    const findProductUseCase = new FindProductUseCase(productsRepository)
    const storeCatalogFacade = new StoreCatalogFacade({
      findAllProductsUseCase,
      findProductUseCase,
    })

    return storeCatalogFacade
  }
}
