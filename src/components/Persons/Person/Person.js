import React, { Component, Fragment } from 'react'

import classes from './Person.module.css'

class Person extends Component {
  render() {
    return <Fragment className={ classes.Person }>
      <p onClick={ this.props.click }>I'm a { this.props.name } and I am { this.props.age } years old!</p>
      <p>{ this.props.children }</p>
      <input type='text' onChange={ this.props.change } value={ this.props.name } />
    </Fragment>
  }
}

export default Person
