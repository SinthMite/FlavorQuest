import { useState } from 'react'
import './App.css'
import LogIn from './LogIn/LogIn.jsx'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function App({ firebase }) {

  return (
    <>
      <LogIn firebase={firebase}/>
    </>
  )
}

export default App
