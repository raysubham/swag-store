import useForm from '../lib/useForm'

export const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'ray',
    price: 125,
    description: 'nice boy',
  })

  return (
    <div>
      <form>
        <label htmlFor='name'>
          Name{' '}
          <input
            type='text'
            id='name'
            name='name'
            placeholder='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            price='price'
            placeholder='price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <button type='button' onClick={clearForm}>
          Clear Form
        </button>
        <button type='button' onClick={resetForm}>
          Reset Form
        </button>
      </form>
    </div>
  )
}
