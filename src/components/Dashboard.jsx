import { documentId } from "firebase/firestore";
import StorageCalculator from "./StorageCalculator";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

export default function Dashboard() {
  const {
    userUsedStorage,
    setUserUsedStorage,
    images,
    setImages,
    getUserDetails,
    currentUser,
    getUserImages,
    loading,
    setLoading,
    userSession,
    setUserSession,
    userDetails,
    setUserDetails,
    userImages,
  } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [imagesInTransit, setImagesInTransit] = useState("");
  const inputRef = useRef(null);
  // const firebase=>Data = async () => {
  //   if (userDetails == null && loading) {
  //     //const document = await getUserDetails();
  //     //console.log(document);
  //     if (document && loading) {
  //       //setUserDetails(document);
  //       if (localStorage.getItem(`${currentUser.uid}`)) {
  //         const setStorage = localStorage.getItem(`${currentUser.uid}`);

  //         setLocalStoredImages(setStorage);
  //       }
  //     }
  //   }
  //   setLoading(false);
  // };

  // const setLocalStorageImages = async () => {

  //   const images =  localStorage.getItem(`${currentUser.uid}`);
  //   console.log(images);
  //   setLocalStoredImages(images);
  // };
  // if(localStoredImages.length < 0) setLocalStorageImages()

  useEffect(() => {
    !userDetails ? setUserSession(false) : null;
  }, []);

  useEffect(()=>{
    console.log("trigger")
    if(!userImages) return;
    let result = StorageCalculator(userImages)
    setUserUsedStorage(parseFloat(result.toFixed(2)))
    result = 0;
  }, [userImages])

  console.log(userUsedStorage)

  useEffect(() => {
    const foo = async () => {
      setLoading(true);
      console.log("useEffect triggertd");
      const document = await getUserDetails();
      setUserDetails(document);
      setLoading(false);
      if (document && currentUser) {
        setUserSession(true);
      }
    };
    if (!userSession) foo();
    console.log("userSession ", userSession);
  }, [currentUser]);

  useEffect(() => {
    console.log("building triggered");
    if (userImages) {
      const images = [...userImages].sort((a,b) => b.date - a.date);
      console.log(images);
      const slideBox = document.querySelector(".slideBox");
      const childCount = slideBox.childElementCount;
      if (childCount == images.length) return;
      while(slideBox.firstChild){
        slideBox.removeChild(slideBox.firstChild)
      }
        images.map((image) => {
        const img = document.createElement("img");
        img.classList.add("slideItem");
        img.setAttribute("src", image.url);
        img.setAttribute("alt", "Something went wrong");
        slideBox.appendChild(img);
      });
    }
  }, [userImages]);

  const uploadFile = async () => {
    if (images === null) return alert("Please select at least one image.");
    setUploading(true);
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    try {
      [...images].map((image) => {
        const imagesRef = ref(
          storage,
          `${currentUser.uid}/${image.name + v4()}`
        );
        const uploadTask = uploadBytesResumable(imagesRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setLoading(true);
            console.log(snapshot.state);
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

          //  setImagesInTransit((prevState) => {
          //     const newImages = [...prevState];

          //     const existingImage = newImages.find(
          //       (item) => item.name === image.name
          //     );
          //     if (existingImage) return prevState;

          //     newImages.push({ name: image.name });
          //     return newImages;
          //   });

          //   console.log(imagesInTransit);

            setUploadProgress(progress);
            console.log(uploadProgress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            setLoading(false);
            setUploading(false);
            setUploadProgress(null);
            await getUserImages();
          }
        );
      });
    } catch (error) {
      alert("Faild to upload your images");
    } finally {
      setImages(null);
    }
  };
  return (
    <>
      {loading ? (
        <div className="userWelcomeTitle">...Loading</div>
      ) : (
        <h2 className="userWelcomeTitle">
          Welcome <br /> {userDetails?.first}
        </h2>
      )}
      <input
        ref={inputRef}
        className="fileUpload"
        accept="image/*"
        multiple
        type="file"
        onChange={(e) => {
          setImages([...e.target.files]);
        }}
      />
      {images ? (
        <button className="uploadButton" onClick={() => uploadFile()}>
          Upload
        </button>
      ) : null}

      <div className={uploading? "loading":"slideBox"}>
      </div>
    </>
  );
}
