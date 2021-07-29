import Link from 'next/link'
import { useCart } from '../lib/useCart'
import CartCount from './CartCount'
import SignOut from './SignOut'
import NavStyles from './styles/NavStyles'
import { useUser } from './User'

const Nav = () => {
  const user = useUser()
  const { openCart } = useCart()
  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <SignOut />
          <button type='button' onClick={openCart}>
            My cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href='/signin'>Sign In</Link>
        </>
      )}
    </NavStyles>
  )
}

export default Nav
