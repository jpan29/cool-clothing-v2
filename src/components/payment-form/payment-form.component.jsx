import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartTotal } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { PaymentButton } from './payment-form.style'
import { PaymentFormContainer, FormContainer } from './payment-form.style'
const PaymentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const total = useSelector(selectCartTotal)
  const currentUser = useSelector(selectCurrentUser)
  const stripe = useStripe()
  const elements = useElements()
  const paymentHandler = async (e) => {
    setIsProcessing(true)
    e.preventDefault()
    if (!stripe || !elements) return
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: total * 100 }),
    }).then((res) => res.json())

    const { client_secret } = response.paymentIntent

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    })

    if (paymentResult.error) alert(paymentResult.error)
    if (paymentResult.paymentIntent.status === 'succeeded')
      alert('payment successful')
    setIsProcessing(false)
  }
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit card payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessing}
          buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}
export default PaymentForm
