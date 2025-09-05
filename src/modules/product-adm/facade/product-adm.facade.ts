import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import {
  InputAddProductDto,
  OutputAddProductDto,
} from '../usecases/add-product/add-product.dto'
import {
  InputFindProductDto,
  OutputFindProductDto,
} from '../usecases/find-product/find-product.dto'
import {
  InputAddProductFacadeDto,
  InputCheckStockProductFacadeDto,
  OutputCheckStockProductFacadeDto,
  ProductAdmFacadeInterface,
} from './product-adm.facade.interface'

export interface ProductAdmFacadeProps {
  addProductUseCase: UseCaseInterface<InputAddProductDto, OutputAddProductDto>
  checkProductStockUseCase: UseCaseInterface<
    InputFindProductDto,
    OutputFindProductDto
  >
}

export class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface<
    InputAddProductDto,
    OutputAddProductDto
  >

  private _checkProductUseCase: UseCaseInterface<
    InputFindProductDto,
    OutputFindProductDto
  >

  constructor(props: ProductAdmFacadeProps) {
    this._addProductUseCase = props.addProductUseCase
    this._checkProductUseCase = props.checkProductStockUseCase
  }

  async addProduct(input: InputAddProductFacadeDto): Promise<void> {
    await this._addProductUseCase.execute(input)
  }

  checkStock: (
    input: InputCheckStockProductFacadeDto,
  ) => Promise<OutputCheckStockProductFacadeDto>
}
