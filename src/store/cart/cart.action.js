import { createAction } from "../../utils/reducer/reducer.utils"
import { CART_ACTION_TYPE } from "./cart.type"

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


export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}
export const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove)
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}
export const cleanItemFromCart = (cartItems, itemToClean) => {
  const newCartItems = cleanCartItem(cartItems, itemToClean)
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}
export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool)
