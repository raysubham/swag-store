import { useUser } from './User'
import SignIn from './SignIn'

const PleaseSignIn = ({ children }) => {
  const user = useUser()
  if (!user) return <SignIn />
  return children
}

export default PleaseSignIn
