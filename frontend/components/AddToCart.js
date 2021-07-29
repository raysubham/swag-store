import { gql, useMutation } from '@apollo/client'
import { CURRENT_USER_QUERY, useUser } from './User'
import { useCart } from '../lib/useCart'
import router from 'next/router'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`

const AddToCart = ({ id }) => {
  const user = useUser()
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
        if (!user) {
          router.push('/signin')
        }
        await addToCart().catch((err) => console.log(err))
        openCart()
      }}>
      Add{loading && 'ing'} To Cart 🛍️
    </button>
  )
}

export default AddToCart
