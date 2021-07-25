import Link from 'next/link'
import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import { formatMoney } from '../lib/formatMoney'
import DeleteProduct from './DeleteProduct'

const Product = ({ product }) => {
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
      <p style={{ textAlign: 'center' }}>{product.description}</p>
      <div className='buttonlist'>
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id,
            },
          }}>
          Edit
        </Link>
        <div>
          <DeleteProduct id={product.id} children='Delete' />
        </div>
      </div>
    </ItemStyles>
  )
}

export default Product
