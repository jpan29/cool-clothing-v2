import { CategoryPreviewContainer } from './category-preview.style'
import ProductCard from '../product-card/product-card.component'
import { Link } from 'react-router-dom'
import { CategoryItem } from '../../store/categories/categories.type'
type CategoryPreviewProps = {
  title: string
  products: CategoryItem[]
}
const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, i) => i < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </CategoryPreviewContainer>
  )
}
export default CategoryPreview
