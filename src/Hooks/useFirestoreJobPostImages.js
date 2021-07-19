

import { useState, useEffect } from 'react';
import { projectFirestore } from '../util/config'

const useFirestoreJobPostImages = (collectionJobPostImages) => {

    const [docsJobPostImages,setDocsJobPostImages] = useState([])

    useEffect(() =>{

    const unsub = projectFirestore.collection(collectionJobPostImages)
    .orderBy("createdAt", 'desc')
    .onSnapshot((snap) =>{
    let documents = [];
    snap.forEach(
        doc => {
            documents.push({...doc.data(), id: doc.id})
        });

        setDocsJobPostImages(documents)
    })
    //this clean up function invokes the unsub method, when the ImageGrid Component is not in use.
    // meaning we are no longer listening to the firestore collection to retrieve documents
    return () => unsub();
    }, [collectionJobPostImages])   
        return { docsJobPostImages };
    }

export default useFirestoreJobPostImages;