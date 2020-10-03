import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    // axios.get('/ingredients.json').then(response => {
    //   this.setState({ ingredients: response.data })
    // }).catch(error => {
    //   this.setState({ error: true })
    // })
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)

    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    const queryParams = []

    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]) )
    }

    queryParams.push('price=' + this.props.price)

    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render () {
    const disableInfo = { ...this.props.ings }

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    let burger = this.state.error ? <p>ingredients cannot be loaded!</p> : <Spinner />

    if (this.props.ings) {
      burger = <>
        <Burger ingredients={ this.props.ings } />
        <BuildControls
          ingredientAdded={ this.props.onIngredientAdded }
          ingredientRemoved={ this.props.onIngredientRemoved }
          disabled={ disableInfo }
          purchaseable={ this.updatePurchaseState(this.props.ings) }
          ordered={ this.purchaseHandler }
          price={ this.props.price }
        />
      </>

      orderSummary = <OrderSummary purchaseCancelled={ this.purchaseCancelHandler } price={ this.props.price } purchaseContinued={ this.purchaseContinueHandler } ingredients={ this.props.ings } />
    }

    return <>
      <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
        { orderSummary }
      </Modal>
      { burger }
    </>
  }
}

const mapStateToProps = state =>{
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
