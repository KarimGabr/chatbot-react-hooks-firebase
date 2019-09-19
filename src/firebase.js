import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

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
const rtdb = firebase.database();

export function setupPresence(user){

  const isOfflineForRTDB = {
    state: "offline",
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineForRTDB = {
    state: "online",
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOfflineForFirestore = {
    state: "offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineForFirestore = {
    state: "online",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async (snapshot) => {
    if(snapshot.val() === false){
      userDoc.update({ status: isOfflineForFirestore });
      return;
    }
    
    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB);
    userDoc.update({ status: isOnlineForFirestore });
  });
}

export { db, firebase }