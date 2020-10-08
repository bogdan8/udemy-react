import React, { useState } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/'
import { updateObject, checkValidity } from '../../../shared/utility'

import classes from './ContactData.module.css'

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      valid: false,
      touched: false,
      validation: {
        required: true
      }
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      valid: false,
      touched: false,
      validation: {
        required: true
      }
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Zip Code'
      },
      value: '',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      }
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      valid: false,
      touched: false,
      validation: {
        required: true
      }
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      valid: false,
      touched: false,
      validation: {
        required: true
      }
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'chipest', displayValue: 'Chipest' }
        ]
      },
      value: 'fastest',
      valid: true,
      validation: {}
    }
  })

  const [formIsValid, seFormIsValid] = useState(false)

  const orderHandler = (e) => {
    e.preventDefault()

    const formData = {}

    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    }

    props.onOrderBurger(order, props.token)
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    let updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      touched: true 
    })

    let updatedOrderForm = updateObject(orderForm, { [inputIdentifier]: updatedFormElement })
    let isValid = true

    for (let inputIdentifier in updatedOrderForm) {
      isValid = updatedOrderForm[inputIdentifier].valid && isValid
    }

    setOrderForm(updatedOrderForm)
    seFormIsValid(isValid)
  }

  let formElementsArray = []

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }

  let form = <form onSubmit={ orderHandler }>
    { 
      formElementsArray.map(formElement => <Input
        key={ formElement.id }
        elementType={ formElement.config.elementType }
        elementConfig={ formElement.config.elementConfig }
        value={ formElement.config.value }
        invalid={ !formElement.config.valid }
        shouldValidate={ formElement.config.validation }
        touched={ formElement.config.touched }
        changed={ (event, ) => inputChangedHandler(event, formElement.id) }
      />)
    }
    <Button btnType='Success' disabled={ !formIsValid }>Order</Button>
  </form>

  if (props.loading) {
    form = <Spinner />
  }

  return <div className={ classes.ContactData }>
    <h4>Enter your Contact Data</h4>

    { form }
  </div>
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
