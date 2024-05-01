import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBf1Ee8vSQJqhtJFjn9ebZn-PYqlHbu3Co",
    authDomain: "recipefinder-e3a1a.firebaseapp.com",
    projectId: "recipefinder-e3a1a",
    storageBucket: "recipefinder-e3a1a.appspot.com",
    messagingSenderId: "136089086610",
    appId: "1:136089086610:web:2a9f213e5746e8fc80944b",
    measurementId: "G-JY0VW5H8G6"
};
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const firebase = {
    db,
    auth,
    firebaseApp
  };
  
  export default firebase;