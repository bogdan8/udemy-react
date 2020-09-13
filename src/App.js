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

  const switchNameHandler = (newName) => {
    setPersonsState({
      persons: [
        { name: newName, age: 22 },
        { name: 'Manu', age: 33 },
        { name: 'Jessica', age: 25 }
      ]
    })
  }

  const nameChangeHandler = (event) => {
    setPersonsState({
      persons: [
        { name: 'Max', age: 22 },
        { name: event.target.value, age: 33 },
        { name: 'Jessica', age: 24 }
      ]
    })
  }

  return <div className="App">
    <h1>Hello 1</h1>
    <h1>Hello 2</h1>

    <button onClick={() => switchNameHandler('Maximilian')}>Switch Name </button>

    <Person
      name={personsState.persons[0].name}
      age={personsState.persons[0].age}
    />
    <Person
      name={personsState.persons[1].name}
      age={personsState.persons[0].age}
      click={switchNameHandler.bind(this, 'Max!')}
      change={nameChangeHandler.bind(this)}>My hobbies: Cycling</Person>
    <Person
      name={personsState.persons[2].name}
      age={personsState.persons[0].age}
    />
  </div>
}

export default App
