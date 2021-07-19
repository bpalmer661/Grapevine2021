//Lesson 42//
import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore



const firebaseConfig = {
    apiKey: "AIzaSyBEkSLuI3itUsX3iIhvDnnHHT7WoCT76qI",
    authDomain: "workservices-e4506.firebaseapp.com",
    databaseURL: "https://workservices-e4506.firebaseio.com",
    projectId: "workservices-e4506",
    storageBucket: "workservices-e4506.appspot.com",
    messagingSenderId: "232325006209",
    appId: "1:232325006209:web:da0aca044337ef4b119e80",
    measurementId: "G-K8BRW9Y8HL"
};

// var firebaseApp = firebase.initializeApp(firebaseConfig, "secondary");
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.log(firebaseApp)

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };


