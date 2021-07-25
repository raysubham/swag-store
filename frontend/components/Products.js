import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'
import styled from 'styled-components'
import Product from '../components/Product'
import { productsPerPage } from '../config'
import DisplayError from './ErrorMessage'
import Loading from './Loading'
import { PAGINATION_QUERY } from './Pagination'
import Button from './styles/Button'

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(skip: $skip, first: $first) {
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

export default function Products({ page }) {
  // ALL THE PAGINATION LOGIC
  const paginationRes = useQuery(PAGINATION_QUERY)
  const productsCount = paginationRes?.data?._allProductsMeta?.count
  const pageCount = Math.ceil(productsCount / productsPerPage)

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * productsPerPage - productsPerPage,
      first: productsPerPage,
    },
  })

  if (loading) return <Loading />
  if (error) return <DisplayError error={error} />
  return (
    <>
      {page >= pageCount + 1 ? (
        <div>
          <p>Oops! No Products to show on this page 😞</p>
          <Button>
            <Link href='/products'>Take Me to the Products Page</Link>
          </Button>
        </div>
      ) : (
        <>
          <ProductListStyles>
            {data?.allProducts?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </ProductListStyles>
        </>
      )}
    </>
  )
}
