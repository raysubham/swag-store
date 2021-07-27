import { gql, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import { useCart } from '../lib/useCart'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`

const AddToCart = ({ id }) => {
  const { openCart } = useCart()
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  return (
    <button
      disabled={loading}
      type='button'
      onClick={async () => {
        await addToCart()
        openCart()
      }}>
      Add{loading && 'ing'} To Cart 🛍️
    </button>
  )
}

export default AddToCart
