import { createContext, useContext, useState } from 'react'

const LocalStateContext = createContext()

const CartStateProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)

  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  const closeCart = () => {
    setCartOpen(false)
  }
  const openCart = () => {
    setCartOpen(true)
  }

  return (
    <LocalStateContext.Provider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}>
      {children}
    </LocalStateContext.Provider>
  )
}

const useCart = () => {
  return useContext(LocalStateContext)
}

export { CartStateProvider, useCart }
