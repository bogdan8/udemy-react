import React, { useState } from 'react'

import classes from  './App.module.css'
import Person from './Person/Person'

const App = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { id: 1, name: 'Max', age: 22 },
      { id: 2, name: 'Dan', age: 33 },
      { id: 3, name: 'Jenny', age: 20 }
    ]
  })

  const [otherState, setOtherState] = useState('some other value')
  const [showPersonsState, setShowPersonsState] = useState(false)

  const nameChangeHandler = (event, id) => {
    const personIndex = personsState.persons.findIndex(person => {
      return person.id === id
    })

    const person = {...personsState.persons[personIndex]}

    person.name = event.target.value

    const persons = [...personsState.persons]
    persons[personIndex] = person;

    setPersonsState({ persons: persons })
  }

  const deletePersonHandler = (personIndex) => {
    // const persons = personsState.persons.slice()
    const persons = [...personsState.persons]

    persons.splice(personIndex, 1)
    setPersonsState({persons: persons})
  }

  const togglePersonsHandler = () => {
    setShowPersonsState(!showPersonsState)
  }

  let persons  = null;
  let btnClass = [];

  if (showPersonsState) {
    persons = <div>
      {
        personsState.persons.map((person, index) => {
          return <Person
            key={person.id}
            click={() => deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            change={(event) => nameChangeHandler(event, person.id)}
          />
        })
      }
    </div>

    btnClass = classes.Red
  }

  const assignedClasses = []

  if (personsState.persons.length <= 2) {
    assignedClasses.push(classes.red)
  }

  if (personsState.persons.length <= 1) {
    assignedClasses.push(classes.bold)
  }

  return <div className={classes.App}>
    <h1>Hi, I'm a React App</h1>
    <p className={assignedClasses.join(' ')}>This is really working!</p>
    <button className={btnClass} onClick={togglePersonsHandler}>Toggle Persons</button>

    {persons}
  </div>
}

export default App
