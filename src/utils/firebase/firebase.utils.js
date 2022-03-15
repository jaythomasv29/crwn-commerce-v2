// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcGGdSaEXHddSPqkite4uMGGH-Wwnyd94",
  authDomain: "crown-db-d5539.firebaseapp.com",
  projectId: "crown-db-d5539",
  storageBucket: "crown-db-d5539.appspot.com",
  messagingSenderId: "95630543226",
  appId: "1:95630543226:web:d2c70dad74028fbf13aec3",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);

// new google auth instance
const provider = new GoogleAuthProvider()
// google authentication to select acct
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.data());
  console.log('userAuth', userAuth)
  // await setDoc(userSnapshot, data);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(e) {
        console.log('error creating user', e.message);
    }
  } 
  return userDocRef;
}