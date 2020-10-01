import React, { Component } from 'react'

import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault()

    this.setState({ loading: true })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Bob',
        address: {
          street: 'Test',
          zipCode: '76000',
          country: 'Ukraine'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'faster'
    }

    axios.post('/orders.json', order).then(response => {
      this.setState({ loading: false })
      this.props.hisotry.push('/')
    }).catch(error => {
      this.setState({ loading: false })
    })
  }

  render () {
    let form = <form>
      <Input inputtype='input' type='text' name='name' placeholder='Your name' />
      <Input inputtype='input' type='email' name='email' placeholder='Your email' />
      <Input inputtype='input' type='text' name='street' placeholder='Street' />
      <Input inputtype='input' type='text' name='postal' placeholder='Postal Code' />

      <Button btnType='Success' clicked={ this.orderHandler }>Order</Button>
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
