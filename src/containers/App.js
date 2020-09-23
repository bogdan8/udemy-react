import React, { Component } from 'react'

import classes from './App.module.css'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../hoc/withClass'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('[App.js] constructor')
  }

  state = {
    persons: [
      { id: 1, name: 'Max', age: 22 },
      { id: 2, name: 'Dan', age: 33 },
      { id: 3, name: 'Jenny', age: 20 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDrivedStateFromProps', props)
    return state
  }

  componentWillMount() {
    console.log('[App.js] componentWillMount')
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id
    })

    const person = { ...this.state.persons[personIndex] }

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState({ persons: persons })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.persons.slice()
    const persons = [...this.state.persons]

    persons.splice(personIndex, 1)
    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({ showPersons: !doesShow })
  }

  render () {
    console.log('[App.js] render')
    let persons  = null;

    if (this.state.showPersons) {
      persons = <Persons persons={ this.state.persons } clicked={ this.deletePersonHandler } changed={ this.nameChangeHandler } />
    }

    return <>
      <button onClick={ () => { this.setState({ showCockpit: false }) } } >Remove Cockpit</button>
      { this.state.showCockpit ? <Cockpit showPersons={ this.state.showPersons } personsLength={ this.state.persons.length } clicked={ this.togglePersonsHandler } /> : null }
      { persons }
    </>
  }
}

export default WithClass(App, classes.App)
