import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import { CURRENT_USER_QUERY } from './User'
import DisplayError from './ErrorMessage'
import Router from 'next/router'

const REQUEST_RESET_PASSWORD_MUTATION = gql`
  mutation REQUEST_RESET_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`

const RequestResetPassword = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  })

  const [requestReset, { data, loading, error }] = useMutation(
    REQUEST_RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    await requestReset().catch(console.error)
    resetForm()
  }

  if (data?.sendUserPasswordResetLink === null)
    return (
      <h2>
        We have sent a password reset link. Please check your email inbox 😊
      </h2>
    )

  return (
    <Form method='POST' onSubmit={handleSubmit} disabled={loading}>
      <h2>Reset Your Password!</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor='email'>Email</label>
        <input
          required
          type='email'
          name='email'
          id='reset-password-email'
          placeholder='Enter your email ...'
          autoComplete='email'
          value={inputs.email}
          onChange={handleChange}
        />

        <button type='submit'>Request Reset</button>
      </fieldset>
    </Form>
  )
}

export default RequestResetPassword
