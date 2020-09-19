import React, { useState } from 'react'
import './App.css'
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

  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  }

  let persons = null;

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

    style.backgroundColor = 'red'
  }

  const classes = []

  if (personsState.persons.length <= 2) {
    classes.push('red')
  }

  if (personsState.persons.length <= 1) {
    classes.push('bold')
  }

  return <div className="App">
    <h1>Hi, I'm a React App</h1>
    <p className={classes.join(' ')}>This is really working!</p>
    <button style={style} onClick={togglePersonsHandler}>Toggle Persons</button>

    {persons}
  </div>
}

export default App
