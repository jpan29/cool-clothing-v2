import { AnyAction } from 'redux'
import { setCartItems, setIsCartOpen } from './cart.action'
import { CartItem } from './cart.type'
export type CartState = {
  readonly cartItems: CartItem[]
  readonly isCartOpen: boolean
}
const INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
}

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    }
  }

  if (setIsCartOpen.match(action))
    return {
      ...state,
      isCartOpen: action.payload,
    }

  return state
}
