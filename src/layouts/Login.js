import React, { Fragment, useEffect } from 'react'
import Authentication from '../services/Authentication.Service'

const Login = (props) => {

  useEffect(() => {
    if (Authentication.isUserLoggedIn()) {
      props?.history?.push("/admin")
    }
  })

  return (
    <Fragment>
      <div>LOGIN</div>
    </Fragment>
  )
}

export default Login