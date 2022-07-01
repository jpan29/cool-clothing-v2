import { takeLatest, call, all, put } from 'typed-redux-saga/macro'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './categories.action'
import { CATEGORIES_ACTION_TYPE } from './categories.type'

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments)
    yield* put(fetchCategoriesSuccess(categoriesArray))
  } catch (err) {
    yield* put(fetchCategoriesFailed(err as Error))
  }
}
export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  )
}
export function* categoriesSaga() {
  yield* all([call(onFetchCategories)])
}
