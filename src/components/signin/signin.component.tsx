// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'
import { useState, ChangeEvent, FormEvent } from 'react'
import { SignInContainer, ButtonsContainer } from './signin.style'
import { useNavigate } from 'react-router-dom'
import FormInput from '../Form/form.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useDispatch } from 'react-redux'
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action'

const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const defaultFormFields = {
    email: '',
    password: '',
  }
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
    // await signInWithGooglePopup()
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      dispatch(emailSignInStart(email, password))
      // await signInAuthUserWithEmailAndPassword(email, password)

      resetFormFields()
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      alert('Invalid email or password')
      console.log('user login failed', err)
    }
  }

  return (
    <>
      <SignInContainer>
        <h2>I have an account</h2>
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
          <ButtonsContainer>
            <Button type="submit">Sign In</Button>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.google}
              type="button"
              onClick={signInWithGoogle}>
              Google SignIn
            </Button>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    </>
  )
}
export default Signin
