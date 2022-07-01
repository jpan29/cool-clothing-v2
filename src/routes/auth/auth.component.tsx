import { AuthContainer } from './auth.style'
import Signup from '../../components/signup/signup.component'
import Signin from '../../components/signin/signin.component'

const Auth = () => {
  return (
    <AuthContainer>
      <Signin />
      <Signup />
    </AuthContainer>
  )
}

export default Auth
