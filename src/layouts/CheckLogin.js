import React, { useEffect, Fragment } from 'react'
import { useParams } from "react-router-dom"
import Services from '../services'
import { CircularProgress } from '@material-ui/core'
import AuthenServices from '../services/Authentication.Service'

const CheckLogin = (props) => {
  let { token } = useParams();

  useEffect(() => {
    if (token) {
      Services.account.getAccountFromToken(token).then(res => {
        AuthenServices.registerSuccessFullLogin(res?.data?.userName, token)
        if (res?.data?.role === 1) {
          props?.history?.push("/admin")
        } else if (res?.data?.role === 2) {
          props?.history?.push("/users")
        }
      }).catch(err => {
        props?.history?.push("/login")
      })
    }
  }, [props?.history, token])

  return (
    <Fragment>
      <CircularProgress style={{ marginLeft: '50%', marginTop: '20%' }} />
    </Fragment>
  )
}

export default CheckLogin