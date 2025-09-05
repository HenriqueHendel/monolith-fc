import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import {
  InputAddProductDto,
  OutputAddProductDto,
} from '../usecases/add-product/add-product.dto'
import {
  InputCheckStockDto,
  OutputCheckStockDto,
} from '../usecases/check-stock/check-stock.interface'
import {
  InputAddProductFacadeDto,
  InputCheckStockProductFacadeDto,
  OutputCheckStockProductFacadeDto,
  ProductAdmFacadeInterface,
} from './product-adm.facade.interface'

export interface ProductAdmFacadeProps {
  addProductUseCase: UseCaseInterface<InputAddProductDto, OutputAddProductDto>
  checkProductStockUseCase: UseCaseInterface<
    InputCheckStockDto,
    OutputCheckStockDto
  >
}

export class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface<
    InputAddProductDto,
    OutputAddProductDto
  >

  private _checkProductUseCase: UseCaseInterface<
    InputCheckStockDto,
    OutputCheckStockDto
  >

  constructor(props: ProductAdmFacadeProps) {
    this._addProductUseCase = props.addProductUseCase
    this._checkProductUseCase = props.checkProductStockUseCase
  }

  async addProduct(input: InputAddProductFacadeDto): Promise<void> {
    await this._addProductUseCase.execute(input)
  }

  async checkStock(
    input: InputCheckStockProductFacadeDto,
  ): Promise<OutputCheckStockProductFacadeDto> {
    return this._checkProductUseCase.execute({ productId: input.productId })
  }
}
