//upload image lesson 

import React from 'react';

const Modal = ({selectedImg, closeImage}) => {

const handleClick = (e) => {
    console.log("handle click called in modal")
    //checks if we have clicked on the image or not.
if(e.target.classList.contains("backdrop")){
    closeImage()
}
}


    return (
        <div 
        className="backdrop"
        onClick={handleClick}
        >
<img src={selectedImg} alt="enlarged pic" />
        </div>
    )
}
export default Modal;