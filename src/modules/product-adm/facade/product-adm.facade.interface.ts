export interface InputAddProductFacadeDto {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export interface InputCheckStockProductFacadeDto {
  productId: string
}

export interface OutputCheckStockProductFacadeDto {
  productId: string
  stock: number
}

export interface ProductAdmFacadeInterface {
  addProduct: (input: InputAddProductFacadeDto) => Promise<void>
  checkStock: (
    input: InputCheckStockProductFacadeDto,
  ) => Promise<OutputCheckStockProductFacadeDto>
}
