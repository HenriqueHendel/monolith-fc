import express, { Request, Response } from 'express'
import { ProductRepository } from '../../repository/product.repository'
import { AddProductUseCase } from '../../usecases/add-product/add-product.usecase'

export const productAdmRoute = express.Router()

productAdmRoute.post('/', async (req: Request, res: Response) => {
  const productRepository = new ProductRepository()
  const addProductUseCase = new AddProductUseCase(productRepository)

  try {
    const addProductData = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    }

    const product = await addProductUseCase.execute(addProductData)

    res.status(201).send(product)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})
