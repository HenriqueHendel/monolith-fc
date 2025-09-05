import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { Product } from '../../domain/entity/product.entity'
import { ProductGateway } from '../../gateway/product.gateway'
import { InputAddProductDto, OutputAddProductDto } from './add-product.dto'

export class AddProductUseCase {
  private _productRepository: ProductGateway

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository
  }

  async execute(input: InputAddProductDto): Promise<OutputAddProductDto> {
    const product = new Product({
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    })

    await this._productRepository.add(product)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
