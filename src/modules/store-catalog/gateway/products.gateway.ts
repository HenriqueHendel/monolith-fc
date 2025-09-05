import { Product } from '../domain/product.entity'

export interface ProductsGateway {
  findAll: () => Promise<Product[]>
  find: (id: string) => Promise<Product>
}
