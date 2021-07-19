
///upload image lesson 

import React from 'react'
import useFirestore from '../Hooks/useFirestore'

const ImageGrid = ({setSelectedImg, user}) => {

    const { docs } = useFirestore('tempJobImages');


return (
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
 

export default ImageGrid;


