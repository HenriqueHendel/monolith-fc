import { Sequelize } from 'sequelize-typescript'
import { ClientAdmFacadeFactory } from '../factory/facade.factory'
import { ClientModel } from '../repository/clent.model'

describe('Client Adm Facade Suit Tests', () => {
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
    const input = {
      name: 'Client name',
      email: 'Client email',
      address: 'Client address',
    }

    const clientAdmFacade = ClientAdmFacadeFactory.create()

    const client = await clientAdmFacade.addClient(input)

    const clientDb = await ClientModel.findOne({ where: { id: client.id } })

    expect(clientDb.id).toBe(client.id)
    expect(clientDb.name).toBe(client.name)
    expect(clientDb.email).toBe(client.email)
    expect(clientDb.address).toBe(client.address)
    expect(clientDb.createdAt).toStrictEqual(client.createdAt)
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt)
  })

  it('should find a client', async () => {
    const clientData = {
      id: '1',
      name: 'Client name',
      email: 'Client email',
      address: 'Client Address',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ClientModel.create(clientData)

    const clientAdmFacade = ClientAdmFacadeFactory.create()

    const client = await clientAdmFacade.findClient({ id: clientData.id })

    expect(client.id).toBe(clientData.id)
    expect(client.name).toBe(clientData.name)
    expect(client.email).toBe(clientData.email)
    expect(client.address).toBe(clientData.address)
    expect(client.createdAt).toStrictEqual(clientData.createdAt)
    expect(client.updatedAt).toStrictEqual(clientData.updatedAt)
  })
})
