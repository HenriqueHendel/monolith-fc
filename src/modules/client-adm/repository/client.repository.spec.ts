import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from './clent.model'
import { ClientAdmRepository } from './client-adm.repository'
import { Client } from '../domain/client.entity'
import { Id } from '../../@shared/domain/value-object/id.value-object'

describe('Suit test for client adm repository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const repository = new ClientAdmRepository()

    const client = new Client({
      id: new Id('1'),
      name: 'Client name',
      email: 'Client email',
      address: 'Client address',
    })

    await repository.addClient(client)

    const output = await ClientModel.findOne({ where: { id: '1' } })

    expect(client.id.id).toBe(output.id)
    expect(client.name).toBe(output.name)
    expect(client.email).toBe(output.email)
    expect(client.address).toBe(output.address)
  })

  it('should find a client', async () => {
    const repository = new ClientAdmRepository()

    const inputData = {
      id: '1',
      name: 'Client name',
      email: 'Client email',
      address: 'Client address',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ClientModel.create(inputData)

    const client = await repository.findClient('1')

    expect(client.id.id).toBe(inputData.id)
    expect(client.name).toBe(inputData.name)
    expect(client.email).toBe(inputData.email)
    expect(client.address).toBe(inputData.address)
  })
})
