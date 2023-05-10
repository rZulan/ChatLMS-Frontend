import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginPage = () => {

  const { loginWithRedirect } = useAuth0();

  return (
     <>
      <div>Login Page</div>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </>
  )
}

export default LoginPage