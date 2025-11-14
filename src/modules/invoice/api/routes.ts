import express, { Request, Response } from 'express'
import { FindInvoiceUseCase } from '../usecase/find/find-invoice.usecase'
import { InvoiceRepository } from '../repository/invoice.repository'
import { InputFindInvoiceUseCaseDto } from '../usecase/find/find-invoice.dto'

export const invoiceRoute = express.Router()

invoiceRoute.get('/:invoiceId', async (req: Request, res: Response) => {
  const invoiceRepository = new InvoiceRepository()
  const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)

  try {
    const input: InputFindInvoiceUseCaseDto = {
      id: req.params.invoiceId,
    }

    const result = await findInvoiceUseCase.execute(input)

    res.status(200).send(result)
  } catch (error) {
    console.log('Error on find invoice => ', error)
    res.status(500).send()
  }
})
