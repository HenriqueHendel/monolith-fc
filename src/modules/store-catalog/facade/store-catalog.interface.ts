export interface InputFindAllProductsFacade {}
export interface OutputFindAllProductsFacade {
  products: {
    id: string
    name: string
    description: string
    salesPrice: number
  }[]
}

export interface InputFindProductFacade {
  id: string
}
export interface OutputFindProductFacade {
  id: string
  name: string
  description: string
  salesPrice: number
}

export interface StoreCatalogFacadeInterface {
  findAllProducts: (
    input?: InputFindAllProductsFacade,
  ) => Promise<OutputFindAllProductsFacade>
  findProduct: (
    input: InputFindProductFacade,
  ) => Promise<OutputFindProductFacade>
}
