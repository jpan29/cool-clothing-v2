import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.style'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../../store/cart/cart.selector'
import { MouseEventHandler } from 'react'
type CartIconProps = {
  onClick: MouseEventHandler<HTMLDivElement>
}
const CartIcon = ({ onClick }: CartIconProps) => {
  const cartCount = useSelector(selectCartCount)

  return (
    <CartIconContainer onClick={onClick}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
