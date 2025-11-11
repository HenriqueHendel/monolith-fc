import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Client } from '../domain/client.entity'
import { Order } from '../domain/order.entity'
import { Product } from '../domain/product.entity'
import { CheckoutGateway } from '../gateway/checkout.gateway'
import { ClientModel } from './client.model'
import { OrderModel } from './order-model'
import { ProductModel } from './product.model'

export class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id.id,
        status: order.status,
        client: {
          id: order.client.id.id,
          name: order.client.name,
          email: order.client.email,
          address: order.client.address,
          createdAt: order.client.createdAt,
          updatedAt: order.client.updatedAt,
        },
        products: order.products.map((product) => ({
          id: product.id.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
      {
        include: [ClientModel, ProductModel],
      },
    )
  }

  async findOrder(id: string): Promise<Order | null> {
    const order = await OrderModel.findOne({ where: { id } })

    if (!order) {
      return null
    }

    return new Order({
      id: new Id(order.id),
      status: order.status,
      client: new Client({
        id: new Id(order.client.id),
        name: order.client.name,
        address: order.client.address,
        email: order.client.email,
      }),
      products: order.products.map(
        (product) =>
          new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
          }),
      ),
    })
  }
}
