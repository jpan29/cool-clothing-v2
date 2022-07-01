import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.style'
import Button from '../button/button.component'
import Item from '../cart-item/cart-item.component'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectCartCount,
  selectCartItems,
} from '../../store/cart/cart.selector'
import { useCallback } from 'react'
const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems)
  const cartCount = useSelector(selectCartCount)
  const navigate = useNavigate()
  const goToCheckout = useCallback(() => {
    navigate('/checkout')
  }, [])

  return (
    <CartDropdownContainer>
      <CartItems>
        {!cartCount ? (
          <EmptyMessage>You cart is empty 🥲</EmptyMessage>
        ) : (
          cartItems.map((cartItem) => (
            <Item cartItem={cartItem} key={cartItem.id} />
          ))
        )}
      </CartItems>
      <Button onClick={goToCheckout}>CHECKOUT</Button>
    </CartDropdownContainer>
  )
}
export default CartDropdown
