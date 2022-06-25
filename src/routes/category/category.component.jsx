import './category.style.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/categories.selector'
import { useState, useEffect } from 'react'
import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner.component'
const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
  const { category } = useParams()

  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category])

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  )
}
export default Category
