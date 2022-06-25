import { useState } from 'react'
import './signup.style.scss'
import Button from '../button/button.component'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../Form/form.component'
import { useDispatch } from 'react-redux'
import { signUpStart } from '../../store/user/user.action'

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords are not same')
      return
    }
    try {
      dispatch(signUpStart(email, password, displayName))

      resetFormFields()
    } catch (err) {
      if (err.code === 'auth/email-already-in-use')
        alert('Email has already been used')
      console.log(err.message)
    }
  }
  return (
    <div className="sign-up-container">
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
    </div>
  )
}
export default Signup
