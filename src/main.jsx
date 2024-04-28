import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBf1Ee8vSQJqhtJFjn9ebZn-PYqlHbu3Co",
  authDomain: "recipefinder-e3a1a.firebaseapp.com",
  projectId: "recipefinder-e3a1a",
  storageBucket: "recipefinder-e3a1a.appspot.com",
  messagingSenderId: "136089086610",
  appId: "1:136089086610:web:2a9f213e5746e8fc80944b",
  measurementId: "G-JY0VW5H8G6"
}
//initalize Firebase App
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App firebase={{ app: firebaseApp, auth }}/>
  </React.StrictMode>,
)
