import React, { useState, useEffect, useCallback } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'

const Ingredients = () => {
  const [ ingredients, setIngredients ] = useState([  ])

  useEffect(() => {
    fetch('https://react-hooks-update-1a385.firebaseio.com/ingredients.json').then(
      response => response.json()
    ).then(responseData => {
      const loadedIngredients = []
      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      setIngredients(loadedIngredients)
    })
  }, [])

  useEffect(() => {
    console.log('Rendering twice', ingredients)
  }, [ingredients])

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

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients)
  }, [])

  const removeIngredientHandler = (ingId) => {
    fetch(`https://react-hooks-update-1a385.firebaseio.com/ingredients/${ingId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIngredients(prevIngredients => [ ...prevIngredients.filter( ingredient => ingredient.id !== ingId ) ])
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={ addIngredientHandler }/>

      <section>
        <Search onLoadIngredients={ filteredIngredientsHandler } />
        <IngredientList onRemoveItem={ removeIngredientHandler } ingredients={ ingredients } />
      </section>
    </div>
  )
}

export default Ingredients
