import './category.style.tsx'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/categories.selector'
import { useState, useEffect } from 'react'
import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner.component'
import { CategoryContainer, CategoryTitle } from './category.style'
import { CategoryItem } from '../../store/categories/categories.type'

type CategoryRouteParams = {
  category: string
}
const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)

  const [products, setProducts] = useState<CategoryItem[]>([])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category])

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </>
  )
}
export default Category
