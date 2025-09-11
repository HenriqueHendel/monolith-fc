import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { ClientAdmRepositoryInterface } from '../../gateway/client-adm.repository.interface'
import {
  InputFindClientDto,
  OutputFindClientDto,
} from './find-client.usecase.dto'

export class FindClientUseCase
  implements UseCaseInterface<InputFindClientDto, OutputFindClientDto>
{
  private _clientAdmRepository: ClientAdmRepositoryInterface

  constructor(clientAdmRepository: ClientAdmRepositoryInterface) {
    this._clientAdmRepository = clientAdmRepository
  }

  async execute(input: InputFindClientDto): Promise<OutputFindClientDto> {
    const client = await this._clientAdmRepository.findClient(input.id)

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}
