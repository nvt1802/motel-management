import React, { Fragment } from "react"
import { createBrowserHistory } from "history"
import { Router, Route, Switch, Redirect } from "react-router-dom"

// core components
import Admin from "layouts/Admin"
import Users from "layouts/Users"
import Login from './layouts/Login'
import CheckLogin from './layouts/CheckLogin'
import auth from './services/Authentication.Service'
import Services from './services'

import "assets/css/material-dashboard-react.css?v=1.9.0"

const hist = createBrowserHistory()

const App = () => {
  const [role, setRole] = React.useState(null)
  React.useEffect(() => {
    Services.account.getAccountFromToken(auth.getJwtAuthToken().substring(7)).then(res => {
      setRole(res.data?.role)
    })
  })

  if (role) {
    return (
      <Router history={hist}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/:token" component={CheckLogin} />
          <AuthenticatedAdminRoute path="/admin" component={Admin} role={role} />
          <AuthenticatedUsersRoute path="/users" component={Users} role={role} />
          {/* <Route path="/admin" component={Admin} /> */}
          {/* <Route path="/users" component={Users} /> */}
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    )
  } else {
    return <Fragment />
  }
}

export default App

function AuthenticatedAdminRoute(props) {
  if (props?.role === 1) {
    return <Route {...props} />
  } else if (props?.role === 2) {
    return <Redirect to="/users"></Redirect>
  }
  else {
    return <Redirect to="/"></Redirect>
  }
}

function AuthenticatedUsersRoute(props) {
  if (props?.role === 2) {
    return <Route {...props} />
  } else if (props?.role === 1) {
    return <Redirect to="/admin"></Redirect>
  }
  else {
    return <Redirect to="/"></Redirect>
  }
}