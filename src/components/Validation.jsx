import React from 'react'

const onlyLetters = (input) =>{
  const testPattern = /^[A-Za-z ]+$/;
  const validation = testPattern.test(input);
  return validation;
}

export default function Validation(credential, userInput) {

  switch (credential) {
    case "name":
   const validName = onlyLetters(userInput);
    if (validName) {
      console.log("valid");
      return false
    } else {
      if (userInput == "") return false;
      console.log("unvalid");
      return true;
    }
      break;
  
    default:
      break;
  }  
}
