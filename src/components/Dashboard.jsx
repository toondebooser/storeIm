import { documentId } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

export default function Dashboard() {
  const { getUserDetails, currentUser, getUserImages, setFoo } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(null);
  const [localStoredImages, setLocalStoredImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [imagesInTransit, setImagesInTransit] = useState("");
  const inputRef = useRef(null);

  if (images) console.log(images);
setFoo(5);


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

  const setLocalStorageImages = async () => {
    const images =  localStorage.getItem(`${currentUser.uid}`);
    console.log(images);
    setLocalStoredImages(images);
  };

  useEffect(() => {
    const foo = async () => {
      const document = await getUserDetails();
      setUserDetails(document);
      setLoading(false);
      if (document && currentUser) {
        const images = localStorage.getItem(`${currentUser.uid}`);
        setLocalStoredImages(images);
      }
    };
    foo();
  }, [currentUser]);

  useEffect(() => {
    console.log(localStoredImages);
    if (localStoredImages?.length > 0) {
      const images = JSON.parse(localStoredImages);
      const slideBox = document.querySelector(".slideBox");
      images.map((image) => {
        const img = document.createElement("img");
        img.classList.add("slideItem");
        img.setAttribute("src", image);
        img.setAttribute("alt", "Something went wrong");
        slideBox.appendChild(img);
      });
    }
  }, [localStoredImages]);

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

            setImagesInTransit((prevState) => {
              const newImages = [...prevState];

              const existingImage = newImages.find(
                (item) => item.name === image.name
              );
              if (existingImage) return prevState;

              newImages.push({ name: image.name });
              return newImages;
            });

            console.log(imagesInTransit);
            console.log(image.name);

            console.log(progress);
            setUploadProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            setUploading(false);
            setUploadProgress(null);
            await getUserImages();
            await setLocalStorageImages();
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

      <div className="slideBox">
      </div>
    </>
  );
}
