import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/'

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    props.onInitIngredients()
  }, [])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)

    return sum > 0
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true)
    } else {
      props.onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase()
    props.history.push('/checkout')
  }

  const disableInfo = { ...props.ings }

  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0
  }

  let orderSummary = null

  let burger = props.error ? <p>ingredients cannot be loaded!</p> : <Spinner />

  if (props.ings) {
    burger = <>
      <Burger ingredients={ props.ings } />
      <BuildControls
        ingredientAdded={ props.onIngredientAdded }
        ingredientRemoved={ props.onIngredientRemoved }
        disabled={ disableInfo }
        purchaseable={ updatePurchaseState(props.ings) }
        ordered={ purchaseHandler }
        isAuth={ props.isAuthenticated }
        price={ props.price }
      />
    </>

    orderSummary = <OrderSummary purchaseCancelled={ purchaseCancelHandler } price={ props.price } purchaseContinued={ purchaseContinueHandler } ingredients={ props.ings } />
  }

  return <>
    <Modal show={ purchasing } modalClosed={ purchaseCancelHandler }>
      { orderSummary }
    </Modal>
    { burger }
  </>
}

const mapStateToProps = state =>{
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
