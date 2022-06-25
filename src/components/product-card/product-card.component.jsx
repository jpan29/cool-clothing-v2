import './product-card.style.scss'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart } from '../../store/cart/cart.action'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { imageUrl, name, price } = product

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}>
        ADD TO CART
      </Button>
    </div>
  )
}
export default ProductCard