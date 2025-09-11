import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { Client } from '../../domain/client.entity'
import { ClientAdmRepositoryInterface } from '../../gateway/client-adm.repository.interface'
import { FindClientUseCase } from './find-client.usecase'

const client = new Client({
  id: new Id('1'),
  name: 'Client name',
  email: 'Client email',
  address: 'Client address',
})

const makeClientAdmRepository = (): ClientAdmRepositoryInterface => ({
  addClient: jest.fn(),
  findClient: jest.fn().mockReturnValue(Promise.resolve(client)),
})

describe('Find client usecase tests', () => {
  it('should find a client', async () => {
    const clientAdmRepository = makeClientAdmRepository()
    const useCase = new FindClientUseCase(clientAdmRepository)

    const output = await useCase.execute({ id: '1' })

    expect(output.id).toBe(client.id.id)
    expect(output.name).toBe(client.name)
    expect(output.email).toBe(client.email)
    expect(output.address).toBe(client.address)
    expect(output.createdAt).toBe(client.createdAt)
    expect(output.updatedAt).toBe(client.updatedAt)
  })
})
