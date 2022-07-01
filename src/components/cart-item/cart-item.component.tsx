import './cart-item.style.tsx'
import { CartItemContainer, ItemDetails } from './cart-item.style'
import { CartItem } from '../../store/cart/cart.type'
type CartItemProps = {
  cartItem: CartItem
}
const Item = ({ cartItem }: CartItemProps) => {
  const { name, quantity, imageUrl, price } = cartItem

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  )
}
export default Item
