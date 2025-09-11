import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { Client } from '../../domain/client.entity'
import { ClientAdmRepositoryInterface } from '../../gateway/client-adm.repository.interface'
import { InputAddClientDto, OutputAddClientDto } from './add-client.usecase.dto'

export class AddClientUseCase
  implements UseCaseInterface<InputAddClientDto, OutputAddClientDto>
{
  private _clientAdmRepository: ClientAdmRepositoryInterface

  constructor(clientAdmReposuitory: ClientAdmRepositoryInterface) {
    this._clientAdmRepository = clientAdmReposuitory
  }

  async execute({
    name,
    address,
    email,
  }: InputAddClientDto): Promise<OutputAddClientDto> {
    const client = new Client({
      name,
      email,
      address,
    })

    await this._clientAdmRepository.addClient(client)

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
