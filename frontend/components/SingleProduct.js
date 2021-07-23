import { useQuery } from '@apollo/client'
import DisplayError from '../components/ErrorMessage'
import gql from 'graphql-tag'
import Head from 'next/head'
import styled from 'styled-components'

const SingleProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  max-width: var(--maxWidth);
  img {
    width: 100%;
    height: 100;
    object-fit: contain;
  }
`

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

const SingleProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <DisplayError error={error} />
  const { Product } = data

  return (
    <SingleProductStyles>
      <Head>
        <title>Swag Store | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className='details'>
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </SingleProductStyles>
  )
}

export default SingleProduct
