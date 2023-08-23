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
  console.log("404 auth");
  const [currentUser, setCurrentUser] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSession, setUserSession] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [images, setImages] = useState(null);
  const [userUsedStorage, setUserUsedStorage] = useState(null);
  const [imageClicked, setImageClicked] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [validCredentials, setValidCredentials]= useState(false)

  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  

  const getUserDetails = async () => {
    // !!
    if (currentUser) {
      console.log("userDetails function activated");
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
    setUserImages(null);
    setUserSession(false);
  };


  const getUserImages = async () => {
    console.log("image fetcher triggered");
    const userImagesRef = ref(storage, `${currentUser.uid}/`);

    const response = await listAll(userImagesRef);

    if (response.items.length === 0) {
      return;
    }

    const imageArray = await Promise.all(
      response.items.map(async (item, index) => {
        const url = await getDownloadURL(item);
        const meta = await getMetadata(item);
        return {
          url: url,
          size: meta.size,
          date: Date.parse(meta.timeCreated),
          name: meta.name,
        };
      })
    );
    const images = imageArray.sort((a, b) => b.date - a.date);
    const imagesWithNewIndex = images.map((image, index) => {
      return {
        ...image,
        indexNr: index,
      };
    });

    setUserImages(imagesWithNewIndex);
  };

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      console.log("UserDetailfetch triggered");
      const document = await getUserDetails();
      setUserDetails(document);
      setLoading(false);
      if (document && currentUser) {
        setUserSession(true);
        getUserImages()
      }
    };
    if (!userSession) fetchUserDetails();
  }, [currentUser]);
  const props = {
    showPreview,
    setShowPreview,
    imageClicked,
    setImageClicked,
    userUsedStorage,
    setUserUsedStorage,
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
