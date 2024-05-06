import './LogIn.css';
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import Home from '../Home/Home.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import googleLogo from '../assetImages/google.svg';

export default function LogIn({ firebase }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    function authSignInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(firebase.auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setLoggedIn(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(errorCode, errorMessage, email, credential);
            });
    }

    function authSignInWithEmail() {
        signInWithEmailAndPassword(firebase.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoggedIn(true);
                setEmail('');
                setPassword('');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    };

    function authCreateAccountWithEmail() {
        createUserWithEmailAndPassword(firebase.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setEmail('');
                setPassword('');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    };

    function authSignOut() {
        signOut(firebase.auth)
            .then(() => {
                setLoggedIn(false);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    };

    function guestLogIn() {
        setLoggedIn(true)
    }

    useEffect(() => {
        window.localStorage.setItem('LogInValue', JSON.stringify(loggedIn));
    }, [loggedIn]);
    
    useEffect(() => {
        const LogInData = window.localStorage.getItem('LogInValue');
        if (LogInData !== null) setLoggedIn(JSON.parse(LogInData));
    }, []);
    async function ApiCatcher() {
      const collectionPath = "API"; // Collection path
  
      try {
          const querySnapshot = await getDocs(collection(firebase.db, collectionPath));
  
          let apiKey = ''; // Initialize apiKey variable
          querySnapshot.forEach((doc) => {
              const recipeData = doc.data().Recipe;
              const recipeString = `${recipeData}`;
              console.log(recipeString);
              apiKey = recipeString; // Set apiKey to the retrieved value
          });
  
          return apiKey; // Return the apiKey value
      } catch (error) {
          console.error("Error getting documents:", error);
          return ''; // Return an empty string in case of error
      }
  }
    return (
        <>
            {!loggedIn && (
                <div className='totalscreenLogView'>
                    <section id="logged-out-view">
                        <div className="containerLogIn">
                            <h1 className="app-title">FlavorQuest</h1>
                            <div className="provider-buttons">
                                <button className="provider-btn" onClick={authSignInWithGoogle}>
                                    <img src={googleLogo} alt="Google Logo" className="google-btn-logo" />
                                </button>
                            </div>
                            <div className="auth-fields-and-buttons">
                                <input className='inputLog' id="email-input" type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                                <input className='inputLog' id="password-input" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                <button className="primary-btn" onClick={authSignInWithEmail}>Sign in</button>
                                <button className="secondary-btn" onClick={authCreateAccountWithEmail}>Create Account</button>
                                <button className="tri-btn" onClick={guestLogIn}>Guest</button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
            {loggedIn && (
                <div className='totalscreenLoggedInView'>
                    <Header firebase={firebase} authSignOut={authSignOut} />
                    <Home ApiCatcher={ApiCatcher} />
                    <Footer />
                </div>
            )}
        </>
    );
}