import React from "react";
import { useEffect, useState, useRef } from "react";
import { useContext, createContext } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {

  return useContext(AuthContext);
};



export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();
  // const passwordConfirmationRef = useRef()

  const createUser = (e) => {
    e.preventDefault();

    // TODO add validation before creation
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        return unsubscribe;
      },
      []
    );
  });

  const props = {
    currentUser,
    emailRef,
    passwordRef,
    createUser,
  };
  return <AuthContext.Provider value={props}>
    {children}
        </AuthContext.Provider>;
}
