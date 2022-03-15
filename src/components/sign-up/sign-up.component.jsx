import { useState } from 'react';
import FormInput from '../form-input/form-input.component'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import Button from '../button/button.component';
import './sign-up.styles.scss'

const defaultForm = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultForm);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()  
    // create userAuth in firebase Auth
    if(password !== confirmPassword) {
      console.log('Error creating user');
      alert('Passwords do not match');
    } 
    try {
      // get userAuth object back and destructure
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      createUserDocumentFromAuth(user, { displayName });
      // clear form field
      setFormFields({...defaultForm})
      alert('User created successful')

    } catch(error) {
      if(error.code === 'auth/email-already-in-use') alert('Email already registered in database')
      console.log(error)
      return;
    }
    
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Name" type="text" required onChange={handleChange} value={displayName} name="displayName" />
        <FormInput label="Email" type="email" required onChange={handleChange} value={email} name="email" />
        <FormInput label="Password" type="password" required onChange={handleChange} value={password} name="password" />
        <FormInput label="Confirm Password" type="password" required onChange={handleChange} value={confirmPassword} name="confirmPassword" />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
export default SignUp