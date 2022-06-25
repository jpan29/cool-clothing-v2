import { createContext, useReducer } from 'react'
import { createAction } from '../utils/reducer/reducer.utils'
const addCartItem = (cartItems, productToAdd) => {
  const currentItem = cartItems.find((item) => item.id === productToAdd.id)

  if (currentItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}
const removeCartItem = (cartItems, itemToRemove) => {
  const currentItem = cartItems.find((item) => item.id === itemToRemove.id)
  if (currentItem.quantity === 1)
    return cartItems.filter((item) => item.id !== currentItem.id)

  return cartItems.map((item) =>
    item.id === itemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  )
}
const cleanCartItem = (cartItems, itemToClean) => {
  const currentItem = cartItems.find((item) => item.id === itemToClean.id)
  if (currentItem) return cartItems.filter((item) => item.id !== currentItem.id)
}
export const CartContext = createContext({
  cartItems: [],
  isCartOpen: false,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cleanItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})
export const CART_ACTION_TYPE = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }

    default:
      throw new Error(`unhandled type ${type} in cartReducer`)
  }
}

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
}
export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )
    dispatch(
      createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    )
  }
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }
  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove)
    updateCartItemsReducer(newCartItems)
  }
  const cleanItemFromCart = (itemToClean) => {
    const newCartItems = cleanCartItem(cartItems, itemToClean)
    updateCartItemsReducer(newCartItems)
  }
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool))
  }
  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    cleanItemFromCart,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
