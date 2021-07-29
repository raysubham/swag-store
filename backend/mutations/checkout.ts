import { KeystoneContext } from '@keystone-next/types'
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types'
import stripeConfig from '../lib/stripe'
import { OrderItem } from '../schemas/OrderItem'

const graphql = String.raw

const checkout = async (
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> => {
  const session = context.session
  if (!session.itemId) {
    throw new Error('Sorry! You must be logged in to create a new order')
  }

  const user = await context.lists.User.findOne({
    where: { id: session.itemId },
    resolveFields: graphql`
    id
    name 
    email
    cart{
        id
        quantity
        product{
            id
            name
            description
            price
            photo{
                id
                image{
                    id
                    publicUrlTransformed
                }
            }
        }
    }
    `,
  })

  const userId = user.id

  // console.dir(user, { depth: null })

  const cartItems = user.cart.filter((cartItem) => cartItem.product)

  const cartTotalAmount = cartItems.reduce(
    (tally: number, cartItem: CartItemCreateInput) => {
      return tally + cartItem.quantity * cartItem.product.price
    },
    0
  )

  const charge = await stripeConfig.paymentIntents
    .create({
      amount: cartTotalAmount * 100,
      currency: 'INR',
      confirm: true,
      payment_method: token,
    })
    .catch((error) => {
      throw new Error(error.message)
    })

  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    }
    return orderItem
  })

  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount / 100,
      paymentId: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  })

  const cartItemIds = user.cart.map((cartItem) => cartItem.id)
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds,
  })

  return order
}

export default checkout
