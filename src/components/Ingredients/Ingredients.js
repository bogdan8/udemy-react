import React, { useState } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'

const Ingredients = () => {
  const [ ingredients, setIngredients ] = useState([  ])

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-1a385.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setIngredients(prevIngredients => [ ...prevIngredients, { id: responseData.name, ...ingredient } ])
    })
  }

  const removeIngredientHandler = (ingId) => {
    setIngredients(prevIngredients => [ ...prevIngredients.filter( ingredient => ingredient.id !== ingId ) ])
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={ addIngredientHandler }/>

      <section>
        <Search />
        <IngredientList onRemoveItem={ removeIngredientHandler } ingredients={ ingredients } />
      </section>
    </div>
  )
}

export default Ingredients
