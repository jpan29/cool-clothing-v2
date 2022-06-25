import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './rootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) return next(action)
//   console.log(action.type)
//   console.log(action.payload)
//   console.log(store.getState())
//   next(action)
//   console.log('next state', store.getState())
// }

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}
const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
  process.env.NODE_ENV === 'development' && logger,
  sagaMiddleware
  // thunk
]
  .filter(Boolean)


const composeEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composeEnhancers)
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)