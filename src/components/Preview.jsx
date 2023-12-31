import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useAuth } from '../context/AuthContext';
import DeleteImage from './DeleteImage';

export default function Preview({images, clickedImage, close}) {
  console.log("404 preview");
  const [firstPic, setFirstPic] = useState(false);
  const [lastPic, setLastPic] = useState(false);
  const [currentPic, setCurrentPic] = useState(clickedImage);

  const imageArray = images;
  
  useEffect(()=>{
    switch (currentPic) {
      case imageArray.length - 1:
        setLastPic(true);
        break;
      case 0:
      setFirstPic(true);
      break;
      default:
      setFirstPic(false)
      setLastPic(false)
        break;
    }
  },[firstPic, lastPic, currentPic])

  const goLeft = ()=>{

firstPic? null: setCurrentPic(currentPic - 1);

}
const goRight = () =>{
  lastPic? null: setCurrentPic(currentPic + 1);
}

  return (
    <>
      <div className='previewBox' >
        <div className="arrowLeft" onClick={()=>goLeft()}>
          <div className="left" onClick={()=>goLeft()} ></div>
        </div>
        <img className='previewImage' src={imageArray[currentPic].url} alt="you fucked up" />
        <div className="arrowRight" >
      <DeleteImage name={imageArray[currentPic].name} />
          <div className='close' onClick={()=>close()}></div>
          <div className="right" onClick={()=>goRight()}></div></div>
      </div>
    </>
  )
}
