import './checkout-item.style.scss'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  addItemToCart,
  cleanItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'
import PaymentForm from '../payment-form/payment-form.component'

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { name, imageUrl, price, quantity } = cartItem

  const cleanItem = () => dispatch(cleanItemFromCart(cartItems, cartItem))
  const addItem = () => dispatch(addItemToCart(cartItems, cartItem))
  const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem))
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
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
    </div>
  )
}
export default CheckoutItem
