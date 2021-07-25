import { useMutation, gql } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import Router from 'next/router'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    endSession
  }
`
const SignOut = () => {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  const handleSignOut = async () => {
    await signOut()
    Router.push('/')
  }
  return (
    <button type='submit' onClick={handleSignOut}>
      Sign Out
    </button>
  )
}

export default SignOut
