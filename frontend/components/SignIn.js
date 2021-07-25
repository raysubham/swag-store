import { useMutation, gql } from '@apollo/client'
import Form from '../components/styles/Form'
import useForm from '../lib/useForm'
import { CURRENT_USER_QUERY } from '../components/User'
import DisplayError from './ErrorMessage'
import Router from 'next/router'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  })

  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  const error =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn()
    resetForm()
    if (
      res.data?.authenticateUserWithPassword?.__typename ===
      'UserAuthenticationWithPasswordSuccess'
    ) {
      Router.push('/')
    }
  }

  return (
    <Form method='POST' onSubmit={handleSubmit} disabled={loading}>
      <h2>Sign In to your account!</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor='email'>Email</label>
        <input
          required
          type='email'
          name='email'
          id='email'
          placeholder='Enter your email address...'
          autoComplete='email'
          value={inputs.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          required
          type='password'
          name='password'
          id='password'
          placeholder='Enter your password...'
          autoComplete='password'
          value={inputs.password}
          onChange={handleChange}
        />
        <button type='submit'>Sign In</button>
      </fieldset>
    </Form>
  )
}

export default SignIn
