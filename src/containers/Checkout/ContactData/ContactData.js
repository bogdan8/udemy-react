import React, { Component } from 'react'

import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    orderForm: {
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
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault()

    this.setState({ loading: true })

    const formData = {}

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    }

    axios.post('/orders.json', order).then(response => {
      this.setState({ loading: false })
      this.props.hisotry.push('/')
    }).catch(error => {
      this.setState({ loading: false })
    })
  }

  checkValidity(value, rules) {
    let isValid = true

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    let updatedOrderForm = { ...this.state.orderForm }
    let updatedFormElement = { ...updatedOrderForm[inputIdentifier] }

    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement

    console.log(updatedFormElement)

    this.setState({ orderForm: updatedOrderForm })
  }

  render () {
    let formElementsArray = []

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = <form onSubmit={ this.orderHandler }>
      { 
        formElementsArray.map(formElement => <Input
          key={ formElement.id }
          elementType={ formElement.config.elementType }
          elementConfig={ formElement.config.elementConfig }
          value={ formElement.config.value }
          invalid={ !formElement.config.valid }
          shouldValidate={ formElement.config.validation }
          touched={ formElement.config.touched }
          changed={ (event, ) => this.inputChangedHandler(event, formElement.id) }
        />)
      }
      <Button btnType='Success'>Order</Button>
    </form>

    if (this.state.loading) {
      form = <Spinner />
    }

    return <div className={ classes.ContactData }>
      <h4>Enter your Contact Data</h4>

      { form }
    </div>
  }
}

export default ContactData
