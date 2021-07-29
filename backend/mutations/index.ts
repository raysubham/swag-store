import { graphQLSchemaExtension } from '@keystone-next/keystone/schema'
import addToCart from './addToCart'
import checkout from './checkout'

const graphql = String.raw

export const extendGrahqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
      checkout(token: String): Order
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
})
