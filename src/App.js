import React from "react"
import { createBrowserHistory } from "history"
import { Router, Route, Switch, Redirect } from "react-router-dom"

// core components
import Admin from "layouts/Admin"
import Users from "layouts/Users"
import Login from './layouts/Login'

import "assets/css/material-dashboard-react.css?v=1.9.0"
import { connect } from "react-redux"

const hist = createBrowserHistory()

const App = ({ authenticate }) => {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/:token" component={Login} />
        <AuthenticatedAdminRoute path="/admin" component={Admin} authenticate={authenticate} />
        <AuthenticatedUsersRoute path="/users" component={Users} authenticate={authenticate} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  )
}

const mapStateToProps = state => ({
  authenticate: state.authenticate
})

export default connect(mapStateToProps, null)(App)

function AuthenticatedAdminRoute(props) {
  if (props?.authenticate?.data?.role === 1) {
    return <Route {...props} />
  } else if (props?.authenticate?.data?.role === 2) {
    return <Redirect to="/users"></Redirect>
  }
  else {
    return <Redirect to="/"></Redirect>
  }
}

function AuthenticatedUsersRoute(props) {
  if (props?.authenticate?.data?.role === 2) {
    return <Route {...props} />
  } else if (props?.authenticate?.data?.role === 1) {
    return <Redirect to="/admin"></Redirect>
  }
  else {
    return <Redirect to="/"></Redirect>
  }
}