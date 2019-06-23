import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBavWhCgB3sXUR0dkmyW8dNpRr1ycKQyWc",
  authDomain: "gradbay-1811.firebaseapp.com",
  databaseURL: "https://gradbay-1811.firebaseio.com",
  projectId: "gradbay-1811",
  storageBucket: "gradbay-1811.appspot.com",
  messagingSenderId: "726401029227",
  appId: "1:726401029227:web:0b4c66fb425d7799"
};

firebase.initializeApp(firebaseConfig);

export const databaseRef = firebase.database().ref();
