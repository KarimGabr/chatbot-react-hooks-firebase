import { useState, useEffect } from 'react';

import { firebase, db, setupPresence } from "../firebase";

export default function useAuth () {
    const [user, setUser] = useState(null);

    useEffect(()=>{
      return firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser)
        {
          const user = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          };

          console.log(user);
          setUser(user);

          db
            .collection('users')
            .doc(user.uid)
            .set(user, { merge: true });

          setupPresence(user);
        } 
        else setUser(null);
      })
    }, []);

    return user;
}