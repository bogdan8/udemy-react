import React, { Component } from 'react'
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Courses from './containers/Courses/Courses'
import Users from './containers/Users/Users'

class App extends Component {
  render () {
    return <BrowserRouter>
      <div className='App'>
        <header className='Blog'>
           <nav>
             <ul>
               <li><NavLink to={ { pathname: '/courses' } }>Coreses</NavLink></li>
               <li><NavLink to={ { pathname: '/users' } }>Users</NavLink></li>
             </ul>
           </nav>
         </header>
        <Switch>
          <Route path='/courses' component={ Courses } />
          <Route path='/users' component={ Users } />
          <Redirect from='/all-courses' to='/courses' />
          <Route render={ () => <h1>Not Found</h1> } />
        </Switch>
      </div>
    </BrowserRouter>
  }
}

export default App
