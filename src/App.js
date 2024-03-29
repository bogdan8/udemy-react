import React, { useEffect, Suspense } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = props => {
  const { onTryAuthSignup } = props

  useEffect(() => {
    onTryAuthSignup()
  }, [onTryAuthSignup])

  let routes = <>
    <Route path='/auth' render={ (props) => <Auth { ...props } /> } />
    <Route path='/' exact component={ BurgerBuilder } />
    <Redirect to='/' />
  </>


  if (props.isAuthenticated) {
    routes = <>
      <Route path='/checkout' render={ (props) => <Checkout { ...props } /> } />
      <Route path='/orders' render={ (props) => <Orders { ...props } /> } />
      <Route path='/logout' component={ Logout } />
      <Route path='/' exact component={ BurgerBuilder } />
      <Redirect to='/' />
    </>
  }

  return <div>
    <Layout>
      <Suspense fallback={ <p>loading</p> }>{ routes }</Suspense>
    </Layout>
  </div>
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
