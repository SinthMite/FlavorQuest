import './Home.css'
import React,{useState} from 'react'


export default function Home( {firebase, authSignOut} ) {
    const currentUser = firebase.auth.currentUser;

    function showProfilePicture(user) {
        if (user && user.photoURL) {
          return <img src={user.photoURL} alt="Profile" />;
        } else {
          return <img src="default-profile-image.png" alt="Default Profile" />;
        }
      }
      function userGreeting(user){
        if(user){
          return <h1>Welcome {user.displayName.split(" ")[0]}</h1>
        }
    
      }
    return(
        <section id="logged-in-view">
            <div className="container">
                {showProfilePicture(firebase.auth.currentUser)}
                <button onClick={authSignOut}>Log Out</button>
                <h3 className='greeting'>{userGreeting(firebase.auth.currentUser)}</h3>
            </div>
        </section>
    )
}