import { graphQLSchemaExtension } from '@keystone-next/keystone/schema'
import addToCart from './addToCart'

const graphql = String.raw

export const extendGrahqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
})
