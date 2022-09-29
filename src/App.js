import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

import './App.css'

const App = () => {
  const [product, setProduct] = useState({
    name: ' Nike Airzoome',
    price: 20,
    productBy: 'Adidass'
  })

  const makePayment = async token => {
    const body = {
      token,
      product,
    }
    const header = {
      'Content-Type': 'application/json'
    }

    try {
      const response = await axios.post('http://localhost:5000/payment', body, {
        headers: {
          header
        }
      })

      const { status } = response
      console.log('Status', status)
      if (response.status === 200) {
        console.log('Your Payment was successful!')
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.status)
        console.log(err.response.data)
      }
    }
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          <span>Product :</span>
          {product.name}
        </p>
        <p>
          <span>Price :</span>
          {product.price}
        </p>
        <a href='#' className='App-link'>
          Learn Stripe
        </a>
        <StripeCheckout
          stripeKey='pk_test_51LK0zIBz45u3eU5CQc0PUwHPaPctbj0MaEIkmf2vha13zui23GwZiYfJj32sa5WgEb7n4KXEg9frlj5g7oXuhexe00Wl0LafZO'
          token={makePayment}
          name='Buy NIke Shoes'
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className='btn btn-info'> Pay</button>
        </StripeCheckout>
      </header>
    </div>
  )
}

export default App
