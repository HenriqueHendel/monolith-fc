import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { ProductsGateway } from '../../gateway/products.gateway'
import {
  InputFindAllProductsDto,
  OutputFindAllProductsDto,
} from './find-all-products.dto'

export class FindAllProductsUseCase
  implements UseCaseInterface<InputFindAllProductsDto, OutputFindAllProductsDto>
{
  private _productsRepository: ProductsGateway

  constructor(productsRepository: ProductsGateway) {
    this._productsRepository = productsRepository
  }

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: InputFindAllProductsDto,
  ): Promise<OutputFindAllProductsDto> {
    const productsOnDatabase = await this._productsRepository.findAll()

    return {
      products: productsOnDatabase.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    }
  }
}
