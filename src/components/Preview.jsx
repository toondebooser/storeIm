import React from 'react'
import { useState, useEffect, useRef } from "react";

export default function Preview({images, clickedImage, close}) {
  const imageArray = images;
  
  return (
    <div className='previewBox'>
      <div> <i class="arrow left"></i></div>
      <img className='previewImage' src={imageArray[clickedImage].url} alt="you fucked up" />
            
    </div>
  )
}
