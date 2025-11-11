import express, { Request, Response } from 'express'
import { ClientAdmRepository } from '../../repository/client-adm.repository'
import { AddClientUseCase } from '../../usecase/add-client/add-client.usecase'

export const clientAdmRoute = express.Router()

clientAdmRoute.post('/', async (req: Request, res: Response) => {
  const clientRepository = new ClientAdmRepository()
  const addClientUseCase = new AddClientUseCase(clientRepository)

  try {
    const addClientData = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    }

    const client = await addClientUseCase.execute(addClientData)

    res.status(201).send(client)
  } catch (error) {
    res.status(500).send(error)
  }
})
