import { ClientAdmRepositoryInterface } from '../../gateway/client-adm.repository.interface'
import { AddClientUseCase } from './add-client.usecase'

const makeClientAdmRepository = (): ClientAdmRepositoryInterface => ({
  addClient: jest.fn(),
  findClient: jest.fn(),
})

describe('Add client usecase test', () => {
  it('should create a client', async () => {
    const clientAdmRepository = makeClientAdmRepository()
    const useCase = new AddClientUseCase(clientAdmRepository)

    const input = {
      name: 'Client name',
      email: 'Client email',
      address: 'Client address',
    }

    const output = await useCase.execute(input)

    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.address).toBe(input.address)
    expect(output.email).toBe(input.email)
    expect(output.createdAt).toBeDefined()
    expect(output.updatedAt).toBeDefined()
  })
})
