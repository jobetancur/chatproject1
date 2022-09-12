// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeQsiwQpYzzuwjfR3BO5DrikzO1bIo4pE",
  authDomain: "chatproject1-8018a.firebaseapp.com",
  projectId: "chatproject1-8018a",
  storageBucket: "chatproject1-8018a.appspot.com",
  messagingSenderId: "170901573485",
  appId: "1:170901573485:web:91193f4c9214bd309e1464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };