import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { ProductsGateway } from '../../gateway/products.gateway'
import {
  InputFindProductDto,
  OutputFindProductDto,
} from './find-product.interface'

export class FindProductUseCase
  implements UseCaseInterface<InputFindProductDto, OutputFindProductDto>
{
  private _productsRepository: ProductsGateway

  constructor(productRepository: ProductsGateway) {
    this._productsRepository = productRepository
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this._productsRepository.find(input.id)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
  }
}
