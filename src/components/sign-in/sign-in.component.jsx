import { auth, signInWithGooglePopup, createUserDocumentFromAuth,  } from '../../utils/firebase/firebase.utils';
import SignUp from '../sign-up/sign-up.component';

const SignIn = () => {

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>SignIn</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <SignUp />
    </div>
  )
}

export default SignIn
