import { documentId } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function Dashboard() {
  const { getUserDetails, currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(null);
  const [localStoredImages, setLocalStoredImages] = useState([]);

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
    // console.log(localStoredImages);
    if (localStoredImages) {
      // localStoredImages.map((image) => {
      //   const imageDiv = document.createElement("div");
      //   imageDiv.classList.add("slideItem");
      //   getDownloadURL(image).then((url)=>{console.log(url);})
      // });
    }
  }, [localStoredImages]);

  const uploadFile = async () => {
    if (images === null) return alert("Please select at least one image.");

    try {
      const uploadImages = [...images].map((image) => {
        const imagesRef = ref(
          storage,
          `${currentUser.uid}/${image.name + v4()}`
        );
        uploadBytes(imagesRef, image);
      });
      await Promise.all(uploadImages);
      setImages(null);
    } catch (error) {
      console.log(error);
      alert("Faild to upload your images");
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
        className="fileUpload"
        accept="image/*"
        multiple
        type="file"
        onChange={(e) => {
          setImages(e.target.files);
        }}
      />
      {images ? (
        <button className="uploadButton" onClick={() => uploadFile()}>
          Upload
        </button>
      ) : null}

      <div className="slideBox"></div>
    </>
  );
}
