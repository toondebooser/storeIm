import React from "react";
import { useEffect, useState, useRef } from "react";
import { useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {

  return useContext(AuthContext);
};



export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef()

  const createUser = (e) => {
    e.preventDefault();

    // TODO add validation before creation
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          console.log(userCredential);
          navigate('/dashboard');
          
          
          })
          .catch((error) => {
            console.log(error);
          });
  };
 
  const loginUser = (e)=>{
    e.preventDefault()
    
    // TODO add validation before creation
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((userCredential) => {
      console.log(userCredential);
      navigate('/dashboard');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const logout = ()=>{
    auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
      })
      return unsubscribe;
      
    
  },[]);

  const props = {
    currentUser,
    emailRef,
    passwordRef,
    passwordConfirmationRef,
    createUser,
    loginUser,
    logout
  };
  return <AuthContext.Provider value={props}>
    {children}
        </AuthContext.Provider>;
}
