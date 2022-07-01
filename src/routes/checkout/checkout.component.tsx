import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutBlock,
  Total,
} from './checkout.style'
import { useSelector } from 'react-redux'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector'
import PaymentForm from '../../components/payment-form/payment-form.component'
const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutBlock>
          <span>Product</span>
        </CheckoutBlock>
        <CheckoutBlock>
          <span>Description</span>
        </CheckoutBlock>
        <CheckoutBlock>
          <span>Quantity</span>
        </CheckoutBlock>
        <CheckoutBlock>
          <span>Price</span>
        </CheckoutBlock>
        <CheckoutBlock>
          <span>Remove</span>
        </CheckoutBlock>
      </CheckoutHeader>
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} cartItem={item} />
      })}
      <Total>Total : ${cartTotal}</Total>
      <PaymentForm />
    </CheckoutContainer>
  )
}
export default Checkout
