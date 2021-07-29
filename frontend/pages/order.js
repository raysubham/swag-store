import { gql, useQuery } from '@apollo/client'
import DisplayError from '../components/ErrorMessage'
import Loading from '../components/Loading'
import OrderStyles from '../components/styles/OrderStyles'
import Head from 'next/head'
import { formatMoney } from '../lib/formatMoney'

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      total
      paymentId
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`

const singleOrderPage = ({ query }) => {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  })

  if (loading) return <Loading />
  if (error) return <DisplayError error={error} />

  const { order } = data

  return (
    <OrderStyles>
      <Head>
        <title>Swag Store - {order.id}</title>
      </Head>
      <h2>
        Thanks for shopping 🛍️ {order.items.length} item
        {order.items.length === 1 ? '' : 's'} with Us!
      </h2>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Payment Id:</span>
        <span>{order.paymentId}</span>
      </p>
      <p>
        <span>Total Amount:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <div className='items'>
        <h3>Order Details</h3>
        {order.items.map((item) => (
          <div className='order-item' key={item.id}>
            <img
              width={50}
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
            />
            <div className='item-details'>
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Price: {formatMoney(item.price)}</p>
              <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  )
}

export default singleOrderPage
