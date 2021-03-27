import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from "react-router-dom"
import Services from '../services'

const Login = () => {
  let { token } = useParams();
  const [account, setAccount] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Services.account.getAccountFromToken(token).then(res => {
      setAccount(res.data)
      setLoading(false)
    }).catch(err => {
      setAccount({})
    })
    console.log(account)
  }, [account, token])

  if (!loading) {
    if (account?.role === 1) {
      return <Redirect to="/admin/dashboard" />
    } else {
      return <Redirect to="/users/dashboard" />
    }
  } else {
    return <div>LOGIN</div>
  }
}

export default Login