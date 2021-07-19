//upload image lesson 
import { useState, useEffect } from 'react';
import { projectFirestore } from '../util/config'

const useFirestore = (collection) => {

    const [docs,setDocs] = useState([])

useEffect(() =>{

const unsub = projectFirestore.collection(collection)
.orderBy("createdAt", 'desc').limit(3)
.onSnapshot((snap) =>{
let documents = [];
snap.forEach(
    doc => {
        documents.push({...doc.data(), id: doc.id})
    });
    setDocs(documents)
})
//this clean up function invokes the unsub method, when the ImageGrid Component is not in use.
// meaning we are no longer listening to the firestore collection to retrieve documents
return () => unsub();
}, [collection])   
    return { docs };
}

export default useFirestore;