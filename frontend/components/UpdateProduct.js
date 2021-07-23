import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client'
import Form from './styles/Form'
import DisplayError from '../components/ErrorMessage'
import useForm from '../lib/useForm'

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      name
    }
  }
`

export const UpdateProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION)

  const { inputs, handleChange } = useForm(data?.Product)

  if (loading) return <p>Loading...</p>

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        })
      }}>
      <DisplayError error={updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor='name'>
          Name
          <input
            autoFocus
            required
            type='text'
            id='name'
            name='name'
            placeholder='Edit product name...'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            required
            type='number'
            id='price'
            name='price'
            placeholder=' Edit price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            required
            type='text'
            id='description'
            name='description'
            placeholder='Edit product description...'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button>Update Product</button>
      </fieldset>
    </Form>
  )
}
