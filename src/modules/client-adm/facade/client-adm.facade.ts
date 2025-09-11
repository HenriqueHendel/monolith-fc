import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import {
  InputAddClientDto,
  OutputAddClientDto,
} from '../usecase/add-client/add-client.usecase.dto'
import {
  InputFindClientDto,
  OutputFindClientDto,
} from '../usecase/find-client/find-client.usecase.dto'
import {
  ClientAdmFacadeInterface,
  InputAddClientFacadeDto,
  InputFindClientFacadeDto,
  OutputAddClientFacadeDto,
  OutputFindClientFacadeDto,
} from './facade.interface'

interface facadeProps {
  addClientUseCase: UseCaseInterface<InputAddClientDto, OutputAddClientDto>
  findClientUseCase: UseCaseInterface<InputFindClientDto, OutputFindClientDto>
}

export class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addClientAdmUseCase: UseCaseInterface<
    InputAddClientDto,
    OutputAddClientDto
  >

  private _findClientAdmUseCase: UseCaseInterface<
    InputFindClientDto,
    OutputFindClientDto
  >

  constructor({ addClientUseCase, findClientUseCase }: facadeProps) {
    this._addClientAdmUseCase = addClientUseCase
    this._findClientAdmUseCase = findClientUseCase
  }

  async addClient(
    input: InputAddClientFacadeDto,
  ): Promise<OutputAddClientFacadeDto> {
    return this._addClientAdmUseCase.execute(input)
  }

  async findClient(
    input: InputFindClientFacadeDto,
  ): Promise<OutputFindClientFacadeDto> {
    return this._findClientAdmUseCase.execute({ id: input.id })
  }
}
