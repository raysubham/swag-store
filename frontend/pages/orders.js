import { gql, useQuery } from '@apollo/client'
import DisplayError from '../components/ErrorMessage'
import Loading from '../components/Loading'
import styled from 'styled-components'
import Head from 'next/head'
import { formatMoney } from '../lib/formatMoney'
import OrderItemStyles from '../components/styles/OrderItemStyles'
import Link from 'next/link'

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
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

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 4rem;
`

const countItemsInAnOrder = (order) =>
  order.items.reduce((tally, item) => tally + item.quantity, 0)

const allOrdersPage = ({ query }) => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY)

  if (loading) return <Loading />
  if (error) return <DisplayError error={error} />

  const { allOrders } = data

  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h1>
        You have total {allOrders.length} Order
        {allOrders.length === 1 ? '' : 's'}!
      </h1>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={{ pathname: '/order', query: { id: order.id } }}>
              <div style={{ cursor: 'pointer' }}>
                <div className='order-meta'>
                  <p>
                    {countItemsInAnOrder(order)} Item
                    {countItemsInAnOrder(order) === 1 ? '' : 's'}
                  </p>
                  <p>
                    {order.items.length} Product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className='images'>
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item?.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  )
}

export default allOrdersPage
