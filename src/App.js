import React, { useState } from 'react'
import './App.css'
import ValidationComponent from './ValidationComponent/ValidationComponent'
import CharComponent from './CharComponent/CharComponent'

const App = props => {
  const [charactersValue,  setInputValueState]  = useState('')

  const updateInputLengthHandler = (e) => {
    setInputValueState(e.target.value.split(''))
  }

  const deleteCharHandler = (charIndex) => {
    const charactes = [...charactersValue]

    charactes.splice(charIndex, 1)

    setInputValueState(charactes)
  }

  let charactesList = null;

  if (charactersValue.length) {
    charactesList = <div>
      {
        charactersValue.map((char, index) => {
          return <CharComponent key={index} char={char} click={() => deleteCharHandler(index)} />
        })
      }
    </div>
  }

  return <div className="App">
    <input type='text' onChange={updateInputLengthHandler.bind(this)} />

    {charactesList}

    <ValidationComponent charactersValue={charactersValue} />
  </div>
}

export default App
