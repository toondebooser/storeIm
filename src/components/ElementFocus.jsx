import React from 'react'

export default function ElementFocus(target) {
    
    const targetElement = document.querySelector(target);
    const viewHeight = window.innerHeight;
    const viewWidth = window.innerWidth;

    const scrollToCentre = ()=>{

    }

    const orientationHandler = ()=>{
        if (viewHeight > viewWidth) {
            console.log("succes");
        }
    }
  return (
    orientationHandler()
  )
}
