import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.style'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../../store/cart/cart.selector'

const CartIcon = ({ onClick }) => {
  const cartCount = useSelector(selectCartCount)

  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
