import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils'
import { CategoryItem } from '../categories/categories.type'
import { CartItem, CART_ACTION_TYPE } from './cart.type'

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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
const removeCartItem = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): CartItem[] => {
  const currentItem = cartItems.find((item) => item.id === itemToRemove.id)
  if (currentItem && currentItem.quantity === 1)
    return cartItems.filter((item) => item.id !== currentItem.id)

  return cartItems.map((item) =>
    item.id === itemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  )
}
const cleanCartItem = (
  cartItems: CartItem[],
  itemToClean: CartItem
): CartItem[] => cartItems.filter((item) => item.id !== itemToClean.id)

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_IS_CART_OPEN,
  boolean
>
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPE.SET_CART_ITEMS,
  CartItem[]
>

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems)
)
export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool)
)
export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  return setCartItems(newCartItems)
}

export const removeItemFromCart = (
  cartItems: CartItem[],
  itemToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove)
  return setCartItems(newCartItems)
}

export const cleanItemFromCart = (
  cartItems: CartItem[],
  itemToClean: CartItem
) => {
  const newCartItems = cleanCartItem(cartItems, itemToClean)
  return setCartItems(newCartItems)
}
