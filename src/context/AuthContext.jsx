import React from "react";
import { useEffect, useState, useRef } from "react";
import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { listAll, getDownloadURL, ref } from "firebase/storage";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [stopLoading, setStopLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  

  const getUserDetails = async () => {
    if (currentUser) {
      try {
        const docRef = await getDocs(collection(db, "users"));
        const documents = docRef.docs.map((doc) => doc.data());
        const matchingDocu = documents.find(
          (docu) => docu.uid === currentUser.uid
        );
        return matchingDocu;
      } catch (error) {
        console.log("Error getting document:", error);
      }
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    // TODO add validation before creation

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(async (userCredential) => {
        console.log(userCredential.user);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          first: nameRef.current.value,
          lastName: lastNameRef.current.value,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });

        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = (e) => {
    e.preventDefault();

    // TODO add validation before creation
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        console.log(userCredential);
        setLoggedOut(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    setLoggedOut(true);
    auth.signOut();
    setStopLoading(true);
  };

  const storeUserImagesLocally = (list) =>{
    localStorage.setItem(`${currentUser.uid}`, JSON.stringify(list))

  }
  
  const getUserImages = async () =>{
    const userImagesRef = ref(storage,  `${currentUser.uid}/`);
    listAll(userImagesRef).then((response)=>{
      if(response.items.length == 0) return;
      storeUserImagesLocally(response)
    })
  }

  if(currentUser) getUserImages();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setStopLoading(true);
        setLoggedOut(false);
        setCurrentUser(user);
      } else {
        setStopLoading(true);
        setLoggedOut(true);
      }
    });
    return unsubscribe;
  }, []);

  const props = {
    currentUser,
    stopLoading,
    loggedOut,
    nameRef,
    lastNameRef,
    emailRef,
    passwordRef,
    passwordConfirmationRef,
    getUserDetails,
    createUser,
    loginUser,
    logout,
  };
  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}
