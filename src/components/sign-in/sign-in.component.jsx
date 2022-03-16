import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import { UserContext } from '../contexts/user.context';
import Button from '../button/button.component';
import './sign-in.styles.scss'

const defaultForm = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultForm);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext)

  const resetForm = () => {
    setFormFields(defaultForm);
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // authenticate user with email and password
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      setCurrentUser(user)
      console.log(user)
      
    } catch (e){
      console.log(e.message)
      switch(e.code) {
        case 'auth/wrong-password':
          alert('Incorrect password. Please try again.')
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(e)
      } 
    } finally {
      resetForm()
    }

  }
  const signInGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response
    const userDocRef = await createUserDocumentFromAuth(user)

  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} value={email} name="email" />
        <FormInput label="Password" type="password" required onChange={handleChange} value={password} name="password" />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType='google' onClick={signInGoogleUser}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}
export default SignIn