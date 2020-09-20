import React, { useState } from 'react'

import classes from './App.module.css'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'

const App = () => {
  const [personsState, setPersonsState] = useState([
    { id: 1, name: 'Max', age: 22 },
    { id: 2, name: 'Dan', age: 33 },
    { id: 3, name: 'Jenny', age: 20 }
  ])

  const [showPersonsState, setShowPersonsState] = useState(false)

  const nameChangeHandler = (event, id) => {
    const personIndex = personsState.findIndex(person => {
      return person.id === id
    })

    const person = { ...personsState[personIndex] }

    person.name = event.target.value

    const persons = [...personsState]
    persons[personIndex] = person;

    setPersonsState(persons)
  }

  const deletePersonHandler = (personIndex) => {
    // const persons = personsState.persons.slice()
    const persons = [...personsState]

    persons.splice(personIndex, 1)
    setPersonsState(persons)
  }

  const togglePersonsHandler = () => {
    setShowPersonsState(!showPersonsState)
  }

  let persons  = null;

  if (showPersonsState) {
    persons = <Persons persons={ personsState } clicked={ deletePersonHandler } changed={ nameChangeHandler } />
  }

  return <div className={ classes.App }>
    <Cockpit showPersons={ showPersonsState } persons={ personsState } clicked={ togglePersonsHandler } />
    { persons }
  </div>
}

export default App
