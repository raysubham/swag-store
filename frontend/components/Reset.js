import { useMutation, gql } from '@apollo/client'
import Form from './styles/Form'
import useForm from '../lib/useForm'
import { CURRENT_USER_QUERY } from './User'
import DisplayError from './ErrorMessage'
import SignIn from '../components/SignIn'

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`

const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  })

  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  )

  const SuccessError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await resetPassword().catch(console.error)
    // resetForm()
    console.log({ data, loading, SuccessError })
  }

  if (data?.redeemUserPasswordResetToken === null)
    return (
      <>
        <h2>
          Voila! You have successfully updated your password. Please Sign In 😊
        </h2>
        <SignIn />
      </>
    )

  return (
    <Form method='POST' onSubmit={handleSubmit} disabled={loading}>
      <h2>Reset Your Passwordxxxxx!</h2>
      <DisplayError error={error || SuccessError} />
      <fieldset>
        <label htmlFor='email'>Email</label>
        <input
          required
          type='email'
          name='email'
          id='reset-password-email'
          placeholder='Enter your email...'
          autoComplete='email'
          value={inputs.email}
          onChange={handleChange}
        />
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

        <button type='submit'>Update Password</button>
      </fieldset>
    </Form>
  )
}

export default Reset
