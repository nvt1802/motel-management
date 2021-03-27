import React from "react"
import ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import Login from './layouts/Login'

// core components
import Admin from "layouts/Admin"
import Users from "layouts/Users"

import "assets/css/material-dashboard-react.css?v=1.9.0"

const hist = createBrowserHistory()

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/token/:token" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/users" component={Users} />
      <Redirect from="/" to="/login" />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>,
  document.getElementById("root")
)
