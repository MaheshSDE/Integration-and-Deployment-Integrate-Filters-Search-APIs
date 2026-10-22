import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import Header from '../Header'
import CartListView from '../CartListView'

import './index.css'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

const Cart = () => {
  const value = useContext(CartContext)
  const {cartList} = value

  const showEmptyView = cartList.length === 0

  return (
    <>
      <Header />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <CartListView />
            <CartSummary />
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
