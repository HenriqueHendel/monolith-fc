export interface InputAddClientFacadeDto {
  name: string
  email: string
  address: string
}

export interface OutputAddClientFacadeDto {
  id: string
  name: string
  email: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface InputFindClientFacadeDto {
  id: string
}

export interface OutputFindClientFacadeDto {
  id: string
  name: string
  email: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface ClientAdmFacadeInterface {
  addClient: (
    input: InputAddClientFacadeDto,
  ) => Promise<OutputAddClientFacadeDto>
  findClient: (
    input: InputFindClientFacadeDto,
  ) => Promise<OutputFindClientFacadeDto>
}
