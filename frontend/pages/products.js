import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Products from '../components/Products'
import Product from '../components/Product'

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
`

export default function ProductsPage() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY)

  if (loading) return <p>Looading...</p>
  if (error) return <p>Error: ${error.message}</p>
  return (
    <>
      <ProductListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductListStyles>
    </>
  )
}
