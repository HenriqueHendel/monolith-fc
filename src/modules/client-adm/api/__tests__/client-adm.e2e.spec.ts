import { sequelize, app } from '../../../../api/express'
import request from 'supertest'

describe('End to end test for Client-Adm module', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const response = await request(app).post('/clients').send({
      name: 'Client 1',
      email: 'client@mail.com',
      address: 'client address',
    })

    expect(response.status).toBe(201)
  })
})
