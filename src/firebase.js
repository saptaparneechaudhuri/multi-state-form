import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

// create doc on firebase, additonal info contains display name, and other info
export const createUserDoc = async (useInfo, additionalInfo = {}) => {
  if (!useInfo) return;

  // instance of document from firestore
  const userDocInstance = doc(db, "users", useInfo.uid);

  // get the user data with a particular uid
  const userData = await getDoc(userDocInstance);

  // if the userData does not exist
  if (!userData.exists()) {
    try {
      // create a user doc

      await setDoc(userDocInstance, {
        email: useInfo.email,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }

    return userDocInstance;
  }
};

// function to sign up user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
