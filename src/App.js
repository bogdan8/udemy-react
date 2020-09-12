import React from 'react'
import './App.css'
import Person from './Person/Person'

function App() {
  return <div className="App">
    <h1>Hello 1</h1>
    <h1>Hello 2</h1>
    <Person name='Max' age='22' />
    <Person name='Dan' age='33' >My hobbies: Cycling</Person>
    <Person name='Jenny' age='20' />
  </div>
}

export default App
