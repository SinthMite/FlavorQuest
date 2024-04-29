import './Header.css';
import React from 'react';

export default function Header({ firebase, authSignOut }) {
    const { currentUser } = firebase.auth;


    function renderProfilePicture(user) {
        if (user && user.photoURL) {
            return <img src={user.photoURL} alt="Profile" className="profile-image" />;
        } else {
            return <img src="default-profile-image.png" alt="Default Profile" className="profile-image" />;
        }
    }

    function renderUserGreeting(user) {
        if (user) {
            return <h1>Welcome {user.displayName.split(" ")[0]}</h1>;
        } else {
            return <h1>Welcome, Guest</h1>;
        }
    }

    return (
        <section id="logged-in-view">
            <div className="container">
                {currentUser ? renderProfilePicture(currentUser) : <img src="default-profile-image.png" alt="Default Profile" />}
                <button onClick={authSignOut}>Log Out</button>
                <h3 className='greeting'>{renderUserGreeting(currentUser)}</h3>
            </div>
        </section>
    );
}
