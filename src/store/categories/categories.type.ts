export enum CATEGORIES_ACTION_TYPE {
  FETCH_CATEGORIES_START = 'categories/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'categories/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'categories/FETCH_CATEGORIES_FAILED',
}

export type CategoryItem = {
  id: number
  imageUrl: string
  price: number
  name: string
}
export type DirectoryCategoryItem = {
  id: number
  title: string
  imageUrl: string
  route: string
}

export type Category = {
  title: string
  imageUrl: string
  items: CategoryItem[]
}
export type CategoryMap = {
  [key: string]: CategoryItem[]
}
