

// // Using .concat(), no wrapper function (not recommended)
// setTempImageUrlsArray(tempImageUrlsArray.concat(query))

// // Using .concat(), wrapper function (recommended)
// setTempImageUrlsArray(tempImageUrlsArray => tempImageUrlsArray.concat(query))

// // Spread operator, no wrapper function (not recommended)
// setTempImageUrlsArray([...tempImageUrlsArray, query])

// // Spread operator, wrapper function (recommended)
// setTempImageUrlsArray(tempImageUrlsArray => [...tempImageUrlsArray, query])


//upload image lesson 
import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../util/config';

const useStorageJobPostImages = (fileJobPostImages) => {

const[progressJobPostImages, setProgressJobPostImages] = useState(0);
const[errorJobPostImages, setErrorJobPostImages] = useState(null);
const[url, setUrlJobPostImages] = useState(null);
const[tempImageUrlsArray, setTempImageUrlsArray] = useState([]);


//useEffect fires off a function everytime the dependency in this case [file] changes
useEffect(() => {
//references
const storageRef = projectStorage.ref(fileJobPostImages.name);

const collectionRef = projectFirestore.collection('tempJobImages')

storageRef.put(fileJobPostImages).on('state_changed', (snap) => {
    let percentage = (snap.bytesTransferred / snap.totalBytes) *100;
    setProgressJobPostImages(percentage);

},(error)=> {
    setErrorJobPostImages(errorJobPostImages)
}, async () => {
const url = await storageRef.getDownloadURL();
const createdAt = timestamp();

//adding to temp url array
//setTempImageUrlsArray(tempImageUrlsArray => [...tempImageUrlsArray, url])

collectionRef.add({url, createdAt});
setUrlJobPostImages(url);

}
)
},[fileJobPostImages])

return { progressJobPostImages, url, errorJobPostImages  }
}

export default useStorageJobPostImages;
