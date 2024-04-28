import './LogIn.css'
import React, {useState} from 'react'
import googleLogo from '../assetImages/google.svg'
import background from '../assetImages/background.jpeg'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Home from '../Home/Home.jsx'
export default function LogIn( {firebase} ) {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[loggedIn, setLoggedIn] = useState(true);
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    function authSignInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(firebase.auth, provider) // Assuming 'auth' is your Firebase auth instance
            .then((result) => {
                // Handle successful sign-in
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setLoggedIn(true); // Move the 'setLoggedIn' inside the 'then' block
            })
            .catch((error) => {
                // Handle sign-in errors
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(errorCode, errorMessage, email, credential); // Use 'console.error' for errors
            });
    }

    function authSignInWithEmail(){
        signInWithEmailAndPassword(firebase.auth, email, password)
        .then((userCredential)=>{
            // Signed in
            const user = userCredential.user;
            setLoggedIn(true);
            setEmail('')
            setPassword('')
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
    };
    function authCreateAccountWithEmail(){
        createUserWithEmailAndPassword(firebase.auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            setEmail('')
            setPassword('')
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
    };
    function authSignOut(){
        signOut(firebase.auth)
        .then(()=>{
            setLoggedIn(false);
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
    };
        return (
            <>
              {!loggedIn && ( // Render only if not logged in
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
                      <input  className='inputLog' id="password-input" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                      <button className="primary-btn" onClick={authSignInWithEmail}>Sign in</button>
                      <button className="secondary-btn" onClick={authCreateAccountWithEmail}>Create Account</button>
                    </div>
                  </div>
                </section>
              )}
              {loggedIn && ( // Render only if logged in
                <Home firebase={firebase} authSignOut={authSignOut}/>
              )}
            </>
          );
        }    
