import './Header.scss';
import React from 'react';
import defaultProfile from '../assetImages/default-profile-image.png'
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
                {currentUser ? renderProfilePicture(currentUser) : <img src={defaultProfile} alt="Default Profile" />}
                <ul>
                    <li>Dining</li>
                    <li>Menu</li>
                    <li>Events</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <button>Book A Table</button>
                <button onClick={authSignOut}>Log Out</button>
            </div>
                <h3 className='greeting'>{renderUserGreeting(currentUser)}</h3>
        </section>
    );
}
