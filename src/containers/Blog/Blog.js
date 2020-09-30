import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'

import './Blog.css'
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'

class Blog extends Component {
  render () {
    return (
      <div>
        <header className='Blog'>
          <nav>
            <ul>
              <li><NavLink to='/posts' exact activeClassName='active' activeStyle={ { color: '#fa923f', textDecoration: 'underline' } }>Posts</NavLink></li>
              <li><NavLink to={ { pathname: '/new-post' } }>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Route path='/new-post' component={ NewPost } />
        <Route path='/posts' component={ Posts } />
      </div>
    )
  }
}

export default Blog
