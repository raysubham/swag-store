import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'

const Button = styled.button`
  background: none;
  font-size: 3rem;
  border: 0;
  &:hover {
    cursor: pointer;
    color: var(--red);
  }
`

const REMOVE_FROM_CART_MUATION = gql`
  mutation REMOVE_FROM_CART_MUATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`
const updateCartAfterRemoval = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem))
}

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUATION, {
    variables: { id },
    update: updateCartAfterRemoval,
  })

  return (
    <Button
      type='button'
      title='Remove From Cart'
      onClick={removeFromCart}
      disabled={loading}>
      &times;
    </Button>
  )
}

export default RemoveFromCart
