import Head from 'next/head'
import Link from 'next/link'
import PaginationStyles from './styles/PaginationStyles'
import { useQuery, gql } from '@apollo/client'
import DisplayError from '../components/ErrorMessage'
import { productsPerPage } from '../config'
import Loading from './Loading'

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`

const Pagination = ({ page }) => {
  const { data, error, loading } = useQuery(PAGINATION_QUERY)
  if (loading) return <Loading />
  if (error) return <DisplayError error={error} />

  const productsCount = data._allProductsMeta.count

  const pageCount = Math.ceil(productsCount / productsPerPage)

  return (
    <PaginationStyles>
      <Head>
        <title>
          Swag Store | Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{productsCount} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  )
}

export default Pagination
