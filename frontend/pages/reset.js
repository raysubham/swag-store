import RequestResetPassword from '../components/RequestResetPassword'
import Reset from '../components/Reset'

const ResetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <>
        <h2>No Reset Token Provided!</h2>
        <h2>Enter your email address3 below to get one!</h2>
        <RequestResetPassword />
      </>
    )
  }

  return (
    <>
      <Reset token={query.token} />
    </>
  )
}

export default ResetPage
