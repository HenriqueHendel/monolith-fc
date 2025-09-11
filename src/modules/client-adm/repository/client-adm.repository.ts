import { Client } from '../domain/client.entity'
import { ClientAdmRepositoryInterface } from '../gateway/client-adm.repository.interface'
import { ClientModel } from './clent.model'
import { Id } from '../../@shared/domain/value-object/id.value-object'

export class ClientAdmRepository implements ClientAdmRepositoryInterface {
  async addClient(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    })
  }

  async findClient(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } })

    if (!client) {
      throw new Error('Client not found')
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    })
  }
}
