import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.style'
import { useNavigate } from 'react-router-dom'
import { DirectoryCategoryItem } from '../../store/categories/categories.type'
type DirectoryItemProps = {
  category: DirectoryCategoryItem
}

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const navigate = useNavigate()
  const { imageUrl, title, route } = category
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body onClick={() => navigate(route)}>
        <h2>{title}</h2>
        <p>shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}
export default DirectoryItem
