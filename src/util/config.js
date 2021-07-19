

//upload image lesson 
//npm i @firebase/storage @firebase/firestore firebase


import firebase from 'firebase/app';
import 'firebase/database'; 
import 'firebase/storage'; 
import '@firebase/firestore'

//Your Web App's Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyBEkSLuI3itUsX3iIhvDnnHHT7WoCT76qI",
    authDomain: "workservices-e4506.firebaseapp.com",
    databaseURL: "https://workservices-e4506.firebaseio.com",
    projectId: "workservices-e4506",
    storageBucket: "workservices-e4506.appspot.com",
    messagingSenderId: "232325006209",
    appId: "1:232325006209:web:da0aca044337ef4b119e80",
    measurementId: "G-K8BRW9Y8HL"
  };

//Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage();
const  projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectStorage, projectFirestore, timestamp}


