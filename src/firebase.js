import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu0aiwXfyS5G41TMsLdKHOiED0BKCihR4",
  authDomain: "multi-step-form-db.firebaseapp.com",
  projectId: "multi-step-form-db",
  storageBucket: "multi-step-form-db.appspot.com",
  messagingSenderId: "97215121338",
  appId: "1:97215121338:web:e8c6f9ef916e4efc497f83",
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
