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
import { listAll, getDownloadURL, ref, getMetadata } from "firebase/storage";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [userImages, setUserImages]=useState([]);
  const [loading, setLoading] = useState(false);
  const [userSession, setUserSession] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [images, setImages] = useState(null);
  const [allImagesDownloaded, setAllImagesDownloaded] = useState(false)
  const [userUsedStorage, setUserUsedStorage] = useState(null);
  
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  
  const getUserDetails = async () => {
    // !!
    if (currentUser) {
      
      console.log("userDetail function activated")
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
    setUserDetails(null);
    setAllImagesDownloaded(false);
    setUserImages(null);
    setUserSession(false);
  };
  // const storeUserImagesLocally = async (image) => {
  //   const storedData = localStorage.getItem(`${currentUser.uid}`);
  //   let imageArray = [];

  //   if (storedData) {
  //     imageArray = JSON.parse(storedData);
  //     const imageExists = imageArray.some((item) => item === image);
  //     if (imageExists) return;
  //   }
  //   imageArray.push(image);
  //   localStorage.setItem(`${currentUser.uid}`, JSON.stringify(imageArray));
  // };

  

  const getUserImages = async () => {
   
    const userImagesRef = ref(storage, `${currentUser.uid}/`);

      const response = await listAll(userImagesRef);
  
      if (response.items.length === 0) {
        return;
      }
  
      const imageArray = await Promise.all(
        response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const mb = await getMetadata(item);
          return [url,mb.size];
        })
      );
      console.log(imageArray);
      setUserImages(imageArray);
      setAllImagesDownloaded(true);
    
    
  };
 if (currentUser && !userSession) getUserImages();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedOut(false);
        setCurrentUser(user);
      } else {
        setLoggedOut(true);
      }
    });
    return unsubscribe;
  }, []);

  const props = {
    allImagesDownloaded,
    currentUser,
    loading,
    images,
    setImages,
    userDetails,
    setUserDetails,
    userSession,
    setUserSession,
    setLoading,
    loggedOut,
    nameRef,
    userImages,
    lastNameRef,
    emailRef,
    passwordRef,
    passwordConfirmationRef,
    getUserDetails,
    createUser,
    loginUser,
    logout,
    getUserImages,
  };
  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}
