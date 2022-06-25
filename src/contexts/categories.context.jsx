import { useState, createContext, useEffect } from 'react'

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'
export const CategoriesContext = createContext({
  categories: {},
  setCategories: () => {},
})
export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({})
  const value = { categories, setCategories }
  useEffect(() => {
    const getCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments()

      setCategories(categoriesMap)
    }
    getCategories()
  }, [])
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
