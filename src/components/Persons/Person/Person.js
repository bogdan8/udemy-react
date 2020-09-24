import React, { Component } from 'react'

import classes from './Person.module.css'
import withClass from '../../../hoc/withClass'
import AuthContext from '../../../context/auth-context'

class Person extends Component {
  constructor(props) {
    super(props)
    this.inputElementRef = React.createRef()
  }
  
  componentDidMount() {
    // this.inputElement.focus()
    this.inputElementRef.current.focus()
  }

  render() {
    return <>
      <AuthContext.Consumer>
        { (context) => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p> }
      </AuthContext.Consumer>
      <p onClick={ this.props.click }>I'm a { this.props.name } and I am { this.props.age } years old!</p>
      <p>{ this.props.children }</p>
      <input 
        // ref={ (inputEl) => { this.inputElement = inputEl } }
        ref={this.inputElementRef}
        type='text'
        onChange={ this.props.change } 
        value={ this.props.name }
      />
    </>
  }
}

export default withClass(Person, classes.Person)
