import React from "react";
import { useEffect, useState, useRef } from "react";
import { useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, getDocs, doc, getDoc  } from "firebase/firestore"; 

const AuthContext = React.createContext();

export const useAuth = () => {

  return useContext(AuthContext);
};



export function AuthProvider({ children }) {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [stopLoading, setStopLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false)

  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef()
  const getData = async () => {


    if (currentUser) {
      try {
        const docRef = doc(db, "users", 
        "K5E8ufHU0bzolvkvxEWO");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    }
  }
  

  const createUser = async (e) => {
    e.preventDefault();

    // TODO add validation before creation
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then( async (userCredential) => {
          console.log(userCredential);
         
          try {
            const docRef = await addDoc(collection(db, "users"), {
              first: nameRef.current.value,
              lastName: lastNameRef.current.value,
              email: userCredential.user.email,
              uid: userCredential.user.uid

            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
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
      setLoggedOut(false)
      navigate('/dashboard');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const logout = ()=>{
    setLoggedOut(true)
    auth.signOut();
    setStopLoading(true)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
       async (user)  =>  {
        if (user) {
          setStopLoading(true);
          setLoggedOut(false);
          setCurrentUser(user);
        } else {
          setStopLoading(true);
          setLoggedOut(true);
        }
      })
      return unsubscribe;
      
    
  },[]);

  const props = {
    currentUser,
    stopLoading,
    loggedOut,
    nameRef,
    lastNameRef,
    emailRef,
    passwordRef,
    passwordConfirmationRef,
    getData,
    createUser,
    loginUser,
    logout
  };
  return <AuthContext.Provider value={props}>
    {children}
        </AuthContext.Provider>;
}
