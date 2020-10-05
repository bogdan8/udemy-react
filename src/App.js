import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount () {
    this.props.onTryAuthSignup()
  }

  render () {
    let routes = <>
      <Route path='/auth' component={ asyncAuth } />
      <Route path='/' exact component={ BurgerBuilder } />
      <Redirect to='/' />
    </>


    if (this.props.isAuthenticated) {
      routes = <>
        <Route path='/checkout' component={ asyncCheckout } />
        <Route path='/orders' component={ asyncOrders } />
        <Route path='/logout' component={ Logout } />
        <Route path='/' exact component={ BurgerBuilder } />
        <Redirect to='/' />
      </>
    }

    return <div>
      <Layout>
        { routes }
      </Layout>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
