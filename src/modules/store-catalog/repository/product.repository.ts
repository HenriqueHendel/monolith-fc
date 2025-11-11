import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Product } from '../domain/product.entity'
import { ProductsGateway } from '../gateway/products.gateway'
import { CatalogModel } from './product.model'

export class ProductRepository implements ProductsGateway {
  async findAll(): Promise<Product[]> {
    const products = await CatalogModel.findAll()

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        }),
    )
  }

  async find(id: string): Promise<Product> {
    const product = await CatalogModel.findOne({ where: { id } })

    if (!product) {
      throw new Error('Product not found')
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    })
  }
}
