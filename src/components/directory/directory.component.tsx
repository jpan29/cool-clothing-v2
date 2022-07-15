import { DirectoryContainer } from './directory.style'
import DirectoryItem from '../directory-item/directory-item.component'
import { DirectoryCategoryItem } from '../../store/categories/categories.type'

const categories: DirectoryCategoryItem[] = [
  {
    id: 1,
    title: 'Hats',
    imageUrl:
      'https://images.unsplash.com/photo-1473632419748-37ef9fc28148?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3222&q=80',
    route: 'shop/hats',
  },
  {
    id: 2,
    title: 'Jackets',
    imageUrl:
      'https://images.unsplash.com/photo-1593908716809-5fd92bf7fbe1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
    route: 'shop/jackets',
  },
  {
    id: 3,
    title: 'Sneakers',
    imageUrl:
      'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    route: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'Womens',
    imageUrl:
      'https://images.unsplash.com/photo-1603370928866-e15805756740?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    route: 'shop/womens',
  },
  {
    id: 5,
    title: 'Mens',
    imageUrl:
      'https://images.unsplash.com/photo-1645790786298-d9f18f32848a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    route: 'shop/mens',
  },
]
const Directory = () => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem category={category} key={category.id} />
      ))}
    </DirectoryContainer>
  )
}
export default Directory
