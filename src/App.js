import React, { Component } from 'react'
import './App.css'
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 22 },
      { name: 'Dan', age: 33 },
      { name: 'Jenny', age: 20 }
    ]
  }

  switchNameHandler = () => {
    // console.log('Hello')
    this.state.persons[0].name = 'New Max'
    this.setState({
      persons: [
        { name: 'New Max', age: 22 },
        { name: 'Dan', age: 33 },
        { name: 'Jenny', age: 25 }
      ]
    })
  }

  render() {
    return (
        <div className="App">
        <h1>Hello 1</h1>
        <h1>Hello 2</h1>

        <button onClick={this.switchNameHandler}>Switch Name </button>

        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[0].age} >My hobbies: Cycling</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[0].age} />
      </div>
    )
  }
}

export default App
