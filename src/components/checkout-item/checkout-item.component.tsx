import { CheckoutItemContainer, ImageContainer } from './checkout-item.style'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  addItemToCart,
  cleanItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

import { CartItem } from '../../store/cart/cart.type'
type CheckoutItemProps = {
  cartItem: CartItem
}
const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { name, imageUrl, price, quantity } = cartItem

  const cleanItem = () => dispatch(cleanItemFromCart(cartItems, cartItem))
  const addItem = () => dispatch(addItemToCart(cartItems, cartItem))
  const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem))
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItem}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>

        <div className="arrow" onClick={addItem}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <span className="remove-button" onClick={cleanItem}>
        &#10005;
      </span>
    </CheckoutItemContainer>
  )
}
export default CheckoutItem
