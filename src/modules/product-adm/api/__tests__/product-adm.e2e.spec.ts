import { sequelize, app } from '../../../../api/express'
import request from 'supertest'

describe('End to end test for Product-Adm module', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product 1',
      description: 'Description',
      purchasePrice: 100,
      stock: 20,
    })

    expect(response.status).toBe(201)
  })
})
