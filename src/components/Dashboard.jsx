import { documentId } from "firebase/firestore";
import StorageCalculator from "./StorageCalculator";
import Preview from "./Preview";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

export default function Dashboard() {
  const {
    imageClicked,
    setImageClicked,
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
  const [showPreview, setShowPreview] = useState(false);
 
  const inputRef = useRef(null);

  useEffect(() => {
    !userDetails ? setUserSession(false) : null;
  }, []);

  const openPreview = (imageClicked)=>{
    setImageClicked(imageClicked);
    setShowPreview(true);
  }
  const closePreview = ()=>{
    setImageClicked(null);
    setShowPreview(false);
  }

  useEffect(() => {
    console.log("calculator trigger");
    if (!userImages) return;
    let result = StorageCalculator(userImages);
    setUserUsedStorage(parseFloat(result.toFixed(2)));
    result = 0;
  }, [userImages]);


  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      console.log("UserDetailfetch triggered");
      const document = await getUserDetails();
      setUserDetails(document);
      setLoading(false);
      if (document && currentUser) {
        setUserSession(true);
      }
    };
    if (!userSession) fetchUserDetails();
  }, [currentUser]);

  useEffect(() => {
    console.log("building triggered");
    if (userImages) {
      const images = [...userImages];
      const slideBox = document.querySelector(".slideBox");
      const childCount = slideBox.childElementCount;
      if (childCount == images.length) return;

      while(slideBox.firstChild){
        slideBox.removeChild(slideBox.firstChild)
      }

        images.map((image) => {
        const a = document.createElement("a");
        const img = document.createElement("img");
        img.classList.add("slideItem");
        a.classList.add("imageLink")
        a.addEventListener("click", () => openPreview(image.indexNr))
        img.setAttribute("src", image.url);
        img.setAttribute("alt", "Something went wrong");
        a.appendChild(img)
        slideBox.appendChild(a);
      });
    }
  }, [userImages]);

  const uploadFile = async () => {
    if (images === null) return alert("Please select at least one image.");
    setUploading(true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    let completedUploads = 0
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
                  console.log(snapshot.state);
                  
                },
                (error) => {
            console.log(error);
          },
          
          async () => {

            completedUploads++;

            if (completedUploads === images.length) {

              setUploading(false);
              setUploadProgress(null);
              await getUserImages();
            }
              
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
    {showPreview&&(<Preview images={userImages} clickedImage={imageClicked} close={closePreview} />)}
      {loading ? (
        <div className="userWelcomeTitle">...Loading</div>
      ) : (
        <h2 className="userWelcomeTitle">
          Welcome <br /> {userDetails?.first}
        </h2>
      )}
      <input
        ref={inputRef}
        className={ showPreview? "fileUpload uploading":"fileUpload"}
        accept="image/*"
        multiple
        type="file"
        onChange={(e) => {
          setImages([...e.target.files]);
        }}
        />
      {images && (
        <button className="uploadButton" onClick={() => uploadFile()}>
          Upload
        </button>
      )}

      <div className={uploading || showPreview?"slideBox uploading":"slideBox"}>
        </div>
        <div className={uploading? "loading fadeIn":"notLoading fadeOut"}>
      </div>

      {/* <div className={uploading ? "slideBox uploading" : "slideBox"}>
        {userImages?.map((image) => (
            <a className="imageLink" onClick={() => alert(image.url)}>

            <img
              className="slideItem"
              src={image.url}
              alt="Something went wrong"
              />
              </a>
        ))}
      </div>
      <div
        className={uploading ? "loading fadeIn" : "notLoading fadeOut"}
      ></div> */}
    </>
  );
}
