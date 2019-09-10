import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDA3eSLqYK65prFXXd6-e3SYPoWsSFZTys",
  authDomain: "chat-app-f853c.firebaseapp.com",
  databaseURL: "https://chat-app-f853c.firebaseio.com",
  projectId: "chat-app-f853c",
  storageBucket: "chat-app-f853c.appspot.com",
  messagingSenderId: "930649301338",
  appId: "1:930649301338:web:9a36059aa4327eea0e5363"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db }