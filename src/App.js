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

  console.log(personsState, otherState)

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: 'New Max', age: 22 },
        { name: 'Dan', age: 33 },
        { name: 'Jenny', age: 25 }
      ]
    })
  }

  return <div className="App">
    <h1>Hello 1</h1>
    <h1>Hello 2</h1>

    <button onClick={switchNameHandler}>Switch Name </button>

    <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
    <Person name={personsState.persons[1].name} age={personsState.persons[0].age} >My hobbies: Cycling</Person>
    <Person name={personsState.persons[2].name} age={personsState.persons[0].age} />
  </div>
}

export default App
