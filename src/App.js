import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Auth from './routes/auth/auth.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'

import { checkUserSesiion } from './store/user/user.action'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUserSesiion())
    // // check auth state

    // const unsubscribe = onAuthStateChangedListener(async (user) => {
    //   if (user) await createUserDocFromAuth(user)
    //   // this dispatch dispatches actions to the root reducer,
    //   // which inturn passes the actions to every single reducer function
    //   dispatch(setCurrentUser(user))

    // })
    // return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Auth />} />
        <Route path='checkout' element={<Checkout />} />


      </Route>
    </Routes>
  )
}

export default App
