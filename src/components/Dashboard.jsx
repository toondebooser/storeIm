import { documentId } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect,useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

export default function Dashboard() {
  const { getUserDetails, currentUser, getUserImages } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(null);
  const [localStoredImages, setLocalStoredImages] = useState([]);
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null);
  const [imagesInTransit, setImagesInTransit] = useState("")
  const inputRef = useRef(null)

  if(images) console.log(images);

  (async () => {
    const document = await getUserDetails();
    if (document && loading) {
      setLoading(false);
      setUserDetails(document);
      if (localStorage.getItem(`${currentUser.uid}`)) {
        const setStorage = 
          localStorage.getItem(`${currentUser.uid}`)
        
        setLocalStoredImages(setStorage);
      }
    }
    
  })();

  useEffect(() => {
    if (localStoredImages.length !== 0) {
      const images = JSON.parse(localStoredImages)
      const slideBox = document.querySelector(".slideBox")
      images.map((image)=>{
        const img = document.createElement("img");
        img.classList.add("slideItem");
        img.setAttribute("src", image);
        img.setAttribute("alt", "Something went wrong");
        slideBox.appendChild(img);

      })
      }
    }, [localStoredImages]);


  const uploadFile = async () => {
    if (images === null) return alert("Please select at least one image.");
    setUploading(true)
    if (inputRef.current) {
      inputRef.current.value = '';
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
             
            setImagesInTransit(prevState => {
              const newImage = new Set(prevState);
              if (newImage.has(image.name)) return;
             newImage.add(image.name)
             return Array.from(newImage);
              })

            console.log(imagesInTransit)
            console.log(image.name);
              
            
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadProgress(progress);
            if (progress == 100) {
              setUploading(false);
              setUploadProgress(null);
            }
          },
          (error) => {
            console.log(error)
          },)
      });
    } catch (error) {
      alert("Faild to upload your images");
    }
      finally{
      setImages(null);
      
    }
  };
  return (
    <>
      {loading ? (
        <div className="userWelcomeTitle">...Loading</div>
      ) : (
        <h2 className="userWelcomeTitle">
          Welcome <br /> {userDetails.first}
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
