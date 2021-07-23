import useForm from '../lib/useForm'
import Form from './styles/Form'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import DisplayError from './ErrorMessage'
import { ALL_PRODUCTS_QUERY } from '../pages/products'
import Router from 'next/router'
import { route } from 'next/dist/next-server/server/router'

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload!
  ) {
    createProduct(
      data: {
        name: $name
        price: $price
        description: $description
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
    }
  }
`

export const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: '',
    price: undefined,
    description: '',
    image: '',
  })

  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  )

  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault()
          console.log(inputs)
          const res = await createProduct()
          clearForm()
          Router.push({
            pathname: `/product/${res.data.createProduct.id}`,
          })
        }}>
        <DisplayError error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor='name'>
            Name
            <input
              autoFocus
              required
              type='text'
              id='name'
              name='name'
              placeholder='Enter product name...'
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
              placeholder='price'
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
              placeholder='Enter product description...'
              value={inputs.description}
              onChange={handleChange}
            />
          </label>
          <label htmlFor='image'>
            Image
            <input
              required
              type='file'
              id='image'
              name='image'
              onChange={handleChange}
            />
          </label>
          <button>Add New Product</button>
        </fieldset>
      </Form>
    </>
  )
}
