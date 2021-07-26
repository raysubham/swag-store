import { useQuery, gql } from '@apollo/client'

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        name
        email
        cart {
          id
          quantity
          product {
            id
            name
            description
            price
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`

export const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  return data?.authenticatedItem
}

export { CURRENT_USER_QUERY }
