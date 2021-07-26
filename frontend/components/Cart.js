import CartStyles from './styles/CartStyles'
import { useUser } from './User'
import Supreme from './styles/Supreme'
import CartItem from './CartItem'
import { formatMoney } from '../lib/formatMoney'
import { calcTotalPrice } from '../lib/calcTotalPrice'
import { useCart } from '../lib/useCart'
import CloseButton from './styles/CloseButton'

const Cart = () => {
  const { cartOpen, closeCart } = useCart()
  const currentUser = useUser()
  if (!currentUser) return null

  console.log(currentUser)
  const firstName = currentUser.name.split(' ')[0]
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{firstName}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {currentUser.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} user={currentUser} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
      </footer>
    </CartStyles>
  )
}

export default Cart
