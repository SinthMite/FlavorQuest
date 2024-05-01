import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import firebase from './FirebaseConfig/FirebaseConfig.jsx';

const { db, auth, firebaseApp } = firebase;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App firebase={firebase}/>
  </React.StrictMode>,
);