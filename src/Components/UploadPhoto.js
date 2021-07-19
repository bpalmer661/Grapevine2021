

//upload image lesson 
import React, { useState } from 'react'





const UploadPhoto = () => {

const [file, setFile] = useState(null);
const [error, setError] = useState(null)


const types = ["image/png", "image/jpeg"]


const changeHandler = (e) => {
    let selected = e.target.files[0]
    if(selected && types.includes(selected.type)) {
        setFile(selected);
        setError('')
        console.log(file)
    } else {
setFile(null);
setError('Please select an image file (png or jpeg)')

console.log(error)
    }
}

        return (
        
          
                <div className="JobPostUploadImageDiv" >
                <label >
                <input type="file" hidden  onChange={changeHandler} />
                <span className="img-container"> 
                <img src='https://cdn.onlinewebfonts.com/svg/img_212908.png' alt="uploaded button "/>
               </span>
                </label> 
                </div>

                
           
        )
    
}

export default UploadPhoto;
