import { createContext, useEffect, useReducer } from 'react'
import { createAction } from '../utils/reducer/reducer.utils'
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils'

// actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const USER_ACTION_TYPE = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}
const userReducer = (state, action) => {
  console.log(action)
  const { type, payload } = action
  switch (type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: payload,
      }
    default:
      throw new Error(`unhandled type ${type} in userReducer`)
  }
}
const INITIAL_STATE = {
  currentUser: null,
}
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user))
  }
  useEffect(() => {
    // check auth state

    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) await createUserDocFromAuth(user)
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])
  // const [currentUser, setCurrentUser] = useState(null)

  const value = { currentUser, setCurrentUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
