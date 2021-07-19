
///upload image lesson 

import React, {  useState } from 'react'
import useFirestore from '../../Hooks/useFirestore'
import useFirestoreJobPostImages from '../../Hooks/useFirestoreJobPostImages'

const JobPostImageGrid = ({setSelectedImg,tempImageUrlsArray,setTempImageUrlsArray}) => {

 
    const { docs } = useFirestoreJobPostImages('tempJobImages');
    //const { docs } = useFirestore('images');
   
    console.log("this is tempImageUrlsArray" + tempImageUrlsArray)

return (
    //from temp url 
/* <div className="job-post-img-grid">
{ tempImageUrlsArray && tempImageUrlsArray.map(url => (
    <div  
    onClick={() => setSelectedImg(url)} 
    
    className="job-post-img-wrap" key={url}>
<img src={url} alt="uploaded" />
        </div>
))}
</div> */


    // from database
    <div className="job-post-img-grid">

 { docs && docs.map(doc => (
     <div  
     onClick={() => setSelectedImg(doc.url)} 
     
     className="job-post-img-wrap" key={doc.id}>
<img src={doc.url} alt="uploaded" />
         </div>
 ))}
</div>

)
 }
 

export default JobPostImageGrid;





