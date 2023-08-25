import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function ValidationAlert() {
    console.log("execte");
  const {setShowValidationAlert}= useAuth();
  const closeValidationAlert = ()=>{
    setShowValidationAlert(false);
  }

  return (
    
    <div className="validationCard">
        <div className="validationALert">
          Account creation faild due to unvalid credentials please correct and
          proceed.
        </div>
        <button onClick={()=>closeValidationAlert()}>Close</button>
    </div>
  );
}
