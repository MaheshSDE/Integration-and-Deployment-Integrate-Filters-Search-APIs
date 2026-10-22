import {BrowserRouter, Route, Routes} from 'react-router'
import {useState} from 'react'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ProductItemDetails from './components/ProductItemDetails'

import CartContext from './context/CartContext'

import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])
  const addCartItem = product => {
    const isProductInCart = cartList.some(each => each.id === product.id)
    if (isProductInCart) {
      const updatedCartList = cartList.map(each => {
        if (each.id === product.id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      })
      setCartList(updatedCartList)
      return
    }
    const newProduct = {...product, quantity: 1}
    setCartList(prevCartList => [...prevCartList, newProduct])
  }
  const deleteCartItem = id => {
    const filteredCartList = cartList.filter(each => each.id !== id)
    setCartList(filteredCartList)
  }
  const incrementCartItemQuantity = id => {
    const updatedCartList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    setCartList(updatedCartList)
  }
  const decrementCartItemQuantity = id => {
    const updatedCartList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })
    setCartList(updatedCartList)
  }
  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList,
          addCartItem,
          deleteCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={

                <Products />
            }
          />
          <Route
            path="/products/:id"
            element={
           
                <ProductItemDetails />
           
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
