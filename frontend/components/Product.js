import Link from 'next/link'
import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import { formatMoney } from '../lib/formatMoney'
import DeleteProduct from './DeleteProduct'
import AddToCart from './AddToCart'
import PleaseSignIn from './PleaseSignIn'
import { useUser } from './User'

const Product = ({ product }) => {
  const user = useUser()
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className='buttonlist'>
        {user && (
          <Link
            href={{
              pathname: '/update',
              query: {
                id: product.id,
              },
            }}>
            Edit
          </Link>
        )}
        <AddToCart id={product.id} />
        {user && <DeleteProduct id={product.id}>Delete</DeleteProduct>}
      </div>
    </ItemStyles>
  )
}

export default Product
