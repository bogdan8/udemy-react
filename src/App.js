import React, { useState } from 'react'
import './App.css'
import Person from './Person/Person'

const App = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Max', age: 22 },
      { name: 'Dan', age: 33 },
      { name: 'Jenny', age: 20 }
    ]
  })

  const [otherState, setOtherState] = useState('some other value')
  const [showPersonsState, setShowPersonsState] = useState(false)

  const nameChangeHandler = (event) => {
    setPersonsState({
      persons: [
        { id: 1, name: 'Max', age: 22 },
        { id: 2, name: event.target.value, age: 33 },
        { id: 3, name: 'Jessica', age: 24 }
      ]
    })
  }

  const deletePersonHandler = (personIndex) => {
    // let persons = personsState.persons.slice()
    let persons = [...personsState.persons]

    persons.splice(personIndex, 1)
    setPersonsState({persons: persons})
  }

  const togglePersonsHandler = () => {
    setShowPersonsState(!showPersonsState)
  }

  const style = {
    backgroundColor: 'white',
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
            click={deletePersonHandler.bind(this)}
            name={person.name}
            age={person.age}
          />
        })
      }
    </div>
  }

  return <div className="App">
    <button style={style} onClick={togglePersonsHandler}>Toggle Persons</button>

    {persons}
  </div>
}

export default App
