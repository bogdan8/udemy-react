import React, { useState, useEffect, useCallback } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search'

const Ingredients = () => {
  const [ ingredients, setIngredients ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState()

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
    setIsLoading(true)

    fetch('https://react-hooks-update-1a385.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false)

      return response.json()
    }).then(responseData => {
      setIngredients(prevIngredients => [ ...prevIngredients, { id: responseData.name, ...ingredient } ])
    })
  }

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients)
  }, [])

  const removeIngredientHandler = (ingId) => {
    setIsLoading(true)

    fetch(`https://react-hooks-update-1a385.firebaseio.com/ingredients/${ingId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      setIngredients(prevIngredients => [ ...prevIngredients.filter( ingredient => ingredient.id !== ingId ) ])
    }).catch(error => {
      setError(error.message)            
      setIsLoading(false)
    })
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className="App">
      { error && <ErrorModal onClose={ clearError }>{ error }</ErrorModal> }
      <IngredientForm onAddIngredient={ addIngredientHandler } loading={ isLoading } />

      <section>
        <Search onLoadIngredients={ filteredIngredientsHandler } />
        <IngredientList onRemoveItem={ removeIngredientHandler } ingredients={ ingredients } />
      </section>
    </div>
  )
}

export default Ingredients
