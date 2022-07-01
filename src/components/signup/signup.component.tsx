import { useState, ChangeEvent, FormEvent } from 'react'
import './signup.style.tsx'
import Button from '../button/button.component'

import FormInput from '../Form/form.component'
import { useDispatch } from 'react-redux'
import { signUpStart } from '../../store/user/user.action'
import { SignUpContainer } from './signup.style'
import { AuthError, AuthErrorCodes } from 'firebase/auth'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Signup = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords are not same')
      return
    }
    try {
      dispatch(signUpStart(email, password, displayName))

      resetFormFields()
    } catch (err) {
      if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS)
        alert('Email has already been used')
      console.log(err)
    }
  }
  return (
    <SignUpContainer>
      <h2>Don't have an account</h2>
      <span>Sign up with you email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          name="email"
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          required
          value={password}
          name="password"
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}
export default Signup
