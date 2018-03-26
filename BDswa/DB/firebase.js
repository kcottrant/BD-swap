import firebase from 'firebase/app';
import React from 'react';
import 'firebase/auth';
import 'firebase/database';

// Connexion à la base de données 
const firebaseConfig = {

    apiKey: "AIzaSyDFN6QfRe8zRX-qOKPowedsGPI-Zc6MSIM",
    authDomain: "bdswap-ck.firebaseapp.com",
    databaseURL: "https://bdswap-ck.firebaseio.com",
    projectId: "bdswap-ck",
    storageBucket: "bdswap-ck.appspot.com",
    messagingSenderId: "62580472841"


};

firebase.initializeApp(firebaseConfig)

