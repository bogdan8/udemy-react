import React, { Component } from 'react'

import classes from './Person.module.css'
import withClass from '../../../hoc/withClass'

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
      { this.props.isAuth ? <p>Authenticated!</p> : <p>Please log in</p> }
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
