import { useMutation, gql } from '@apollo/client'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`

const updatePageAfterDelete = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct))
}

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { data, loading }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update: updatePageAfterDelete,
    }
  )
  return (
    <button
      disabled={loading}
      type='button'
      onClick={async () => {
        if (confirm('Do you want to delete this product?')) {
          await deleteProduct().catch((err) => alert(err.message))
        }
      }}>
      {children}
    </button>
  )
}

export default DeleteProduct
