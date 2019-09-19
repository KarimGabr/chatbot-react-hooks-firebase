import { useState, useEffect } from 'react';

import { db } from "../firebase";

export default function useCollection (path, orderBy="createdAt", where=null) {
    const [docs, setDocs] = useState([]);
  
    useEffect(() => {
      let collection = db.collection(path);
      
      if (orderBy) {
        collection = collection.orderBy(orderBy);
      }

      if (where){
        const [queryField, queryOperator, queryValue] = where;
        collection = collection.where(queryField, queryOperator, queryValue);
      }
      
      return collection.onSnapshot( collection => {
          const docs = [];
          collection.forEach( doc => {
            docs.push({
              ...doc.data(),
              id: doc.id
            });
          });
          setDocs(docs);
        });
    }, [path]);
  
    return docs;
}