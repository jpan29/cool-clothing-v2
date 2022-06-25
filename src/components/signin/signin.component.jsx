// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'
import { useState } from 'react'
import './signin.style.scss'

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../Form/form.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useDispatch } from 'react-redux'
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action'

const Signin = () => {
  const dispatch = useDispatch()
  // useEffect(async () => {
  //   const user = await getRedirectResult(auth)
  //   if (user) {
  //     const userDoc = await createUserDocFromAuth(user)
  //   }
  // }, [])
  const defaultFormFields = {
    email: '',
    password: '',
  }
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
    // await signInWithGooglePopup()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(emailSignInStart(email, password))
      // await signInAuthUserWithEmailAndPassword(email, password)

      resetFormFields()
    } catch (err) {
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      )
        alert('Invalid email or password')
      console.log(err.message)
    }
  }

  return (
    <>
      <div className="sign-in-container">
        <h2>I have an acount</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.google}
              type="button"
              onClick={signInWithGoogle}>
              Google Sign In
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default Signin
