import { Client } from '../domain/client.entity'

export interface ClientAdmRepositoryInterface {
  addClient: (client: Client) => Promise<void>
  findClient: (id: string) => Promise<Client>
}
