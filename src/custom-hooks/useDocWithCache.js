import { useState, useEffect } from 'react';

import { db } from "../firebase";

const cache = {};
const pendingCache = {};

export default function useDocWithCache (path) {
    const [doc, setDoc] = useState(cache[path]);
  
    useEffect(() => {
      let stillMounted = true;

      if(doc) return;
      
      const promise = pendingCache[path] || (pendingCache[path] = db.doc(path).get());
      
      promise.then( doc => {
        if(stillMounted) {            
          const user = {
            ...doc.data(),
            id: doc.id
          }

          setDoc(user);
          cache[path] = user;
        }
      });

      return () => {
        stillMounted = false;
      };

    }, [path, doc]);
  
    return doc;
}