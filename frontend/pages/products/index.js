import Products from '../../components/Products'
import Pagination from '../../components/Pagination'
import { useRouter } from 'next/dist/client/router'

const ProductsPage = () => {
  const { query } = useRouter()
  const page = Number(query.page) || 1

  return (
    <>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </>
  )
}

export default ProductsPage
