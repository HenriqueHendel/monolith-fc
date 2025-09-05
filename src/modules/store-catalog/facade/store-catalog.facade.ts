import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import {
  InputFindAllProductsDto,
  OutputFindAllProductsDto,
} from '../usecase/find-all-products/find-all-products.dto'
import {
  InputFindProductDto,
  OutputFindProductDto,
} from '../usecase/find-product/find-product.interface'
import {
  InputFindAllProductsFacade,
  InputFindProductFacade,
  OutputFindAllProductsFacade,
  OutputFindProductFacade,
  StoreCatalogFacadeInterface,
} from './store-catalog.interface'

interface FacadeProps {
  findAllProductsUseCase: UseCaseInterface<
    InputFindAllProductsDto,
    OutputFindAllProductsDto
  >
  findProductUseCase: UseCaseInterface<
    InputFindProductDto,
    OutputFindProductDto
  >
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findAllProductsUseCase: UseCaseInterface<
    InputFindAllProductsDto,
    OutputFindAllProductsDto
  >

  private _findProductUseCase: UseCaseInterface<
    InputFindProductDto,
    OutputFindProductDto
  >

  constructor(props: FacadeProps) {
    this._findAllProductsUseCase = props.findAllProductsUseCase
    this._findProductUseCase = props.findProductUseCase
  }

  async findAllProducts(
    input?: InputFindAllProductsFacade,
  ): Promise<OutputFindAllProductsFacade> {
    return this._findAllProductsUseCase.execute(input)
  }

  async findProduct(
    input: InputFindProductFacade,
  ): Promise<OutputFindProductFacade> {
    return this._findProductUseCase.execute(input)
  }
}
