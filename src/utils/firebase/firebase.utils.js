// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, writeBatch, getDocs, query } from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);  // get collection reference
  const batch = writeBatch(db);  //// Get a new write batch
  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })
  await batch.commit();
  console.log('done adding collection');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshop = await getDocs(q);
  const categoryMap = querySnapshop.docs.reduce((acc, docSnapshot) => {
    const {title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
  return categoryMap
}

// new google auth instance
const googleProvider = new GoogleAuthProvider()
// google authentication to select acct
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
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
        createdAt,
        ...additionalInformation
      });
    } catch(e) {
        console.log('error creating user', e.message);
    }
  } 
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  const userAuth = await createUserWithEmailAndPassword(auth, email, password)
  return userAuth
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  const userAuth = await signInWithEmailAndPassword(auth, email, password);
  return userAuth
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);