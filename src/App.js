import React, { useState } from 'react'
import './App.css'

import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

const App = props => {
  const [usersState, setUsersState] = useState({
    users: [
      { name: 'Dan' },
      { name: 'Carl' },
      { name: 'Bob' },
      { name: 'Harry' }
    ]
  })

  const setNameHandler = (e) => {
    setUsersState({
      users: [
        { name: e.target.value },
        { name: 'Carl' },
        { name: 'Jessica' },
        { name: 'Harry' }
      ]
    })
  }

  return <div className="App">
    <UserInput change={setNameHandler.bind(this)} name={usersState.users[0].name} />

    <UserOutput name={usersState.users[0].name} />
    <UserOutput name={usersState.users[1].name} />
    <UserOutput name={usersState.users[2].name} />
    <UserOutput name={usersState.users[3].name} />
  </div>
}

export default App
