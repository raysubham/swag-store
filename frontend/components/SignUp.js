import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import { CURRENT_USER_QUERY } from './User'
import DisplayError from './ErrorMessage'
import Router from 'next/router'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  })

  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signUp().catch(console.error)
    resetForm()
  }

  if (data?.createUser)
    return (
      <h2>
        Hey 👋 {data.createUser.name}, Thanks for signing up. Please Sign In 😊
      </h2>
    )

  return (
    <Form method='POST' onSubmit={handleSubmit} disabled={loading}>
      <h2>Sign Up for an account!</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor='name'>Name</label>
        <input
          required
          type='text'
          name='name'
          id='signup-name'
          placeholder='Enter your name...'
          autoComplete='name'
          value={inputs.name}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          required
          type='email'
          name='email'
          id='signup-email'
          placeholder='Enter your email address ...'
          autoComplete='email'
          value={inputs.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          required
          type='password'
          name='password'
          id='signup-password'
          placeholder='Enter your password...'
          autoComplete='password'
          value={inputs.password}
          onChange={handleChange}
        />
        <button type='submit'>Sign Up</button>
      </fieldset>
    </Form>
  )
}

export default SignUp
