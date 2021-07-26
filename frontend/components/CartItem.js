import styled from 'styled-components'
import { formatMoney } from '../lib/formatMoney'

const CartItemsStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lighgrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`

const CartItem = ({ cartItem, user }) => {
  const product = cartItem.product
  return (
    <CartItemsStyles>
      <img
        width='100'
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -{' '}
          <em>
            {product.price} &times; {cartItem.quantity}
          </em>{' '}
          each
        </p>
      </div>
    </CartItemsStyles>
  )
}

export default CartItem
