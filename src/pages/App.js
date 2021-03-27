import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import routes, { RouteWithSubRoutes } from './Routes'
import Header from '../containers/header'
import Footer from '../containers/footer'
import Search from '../containers/search'
import Login from '../containers/login'
import { connect } from 'react-redux'
import '../assets/style/index.css'
import { authenticateAction } from '../redux/actions'
import AuthenServices from '../services/Authentication.Service'

function App({ initAuthenticate }) {

  useEffect(() => {
    if (AuthenServices.getUsername()) {
      initAuthenticate(AuthenServices.getUsername())
    }
  }, [initAuthenticate])

  return (
    <Router>
      <Header />
      <Search />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch >
      <Login />
      <Footer />
    </Router >
  );
}

const mapDispatchToProps = dispatch => ({
  initAuthenticate: (username) => dispatch(authenticateAction.initAuthenticate(username))
})

export default connect(null, mapDispatchToProps)(App)
