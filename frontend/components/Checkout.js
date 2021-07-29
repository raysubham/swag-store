import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import router from 'next/router'
import { useCart } from '../lib/useCart'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import SwagButton from './styles/SwagButton'
import nProgress from 'nprogress'
import nprogress from 'nprogress'
import { CURRENT_USER_QUERY } from './User'

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgb(0, 0, 0, 0.04);
  border: 0 solid rgb(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      paymentId
      total
      items {
        id
        name
      }
    }
  }
`

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

const CheckoutForm = () => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const { closeCart } = useCart()

  const stripe = useStripe()
  const elements = useElements()

  const [checkout, { error: GraphqlError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    nProgress.start()

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })

    if (stripeError) {
      setError(stripeError)
      setLoading(false)
      nprogress.done()
      return
    }

    const order = await checkout({
      variables: { token: paymentMethod.id },
    }).catch((graphqlError) => {
      setError(graphqlError)
    })

    console.log(order)
    console.log(error)

    router.push({
      pathname: '/order',
      query: { id: order?.data.checkout.id },
    })

    closeCart()

    setLoading(false)
    nprogress.done()
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>Oops! {error.message}</p>}
      <CardElement />
      <SwagButton disabled={loading}>Checkout</SwagButton>
    </CheckoutFormStyles>
  )
}

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout
