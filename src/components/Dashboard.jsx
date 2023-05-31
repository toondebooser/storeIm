import { documentId } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { storage,  } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";


export default function Dashboard() {
  const { getUserDetails, currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages]= useState(null);
  console.log(currentUser.uid);

if(images)console.log(images[0].name);  

  const dataFetch = async () => {
    const document = await getUserDetails();
    if (document && loading) {
      setLoading(false);
      setUserDetails(document);
    }
  };
  dataFetch();
const uploadFile = () =>{
  if (images === null)  return alert("Please select at least one image.");

  const imagesRef = ref(storage, `${currentUser.uid}/${images.name + v4()}` );
  uploadBytes(imagesRef, images).then(()=> {
    alert("succes")
  })

}
  return (
    <>
      {loading ? (
        <div className="userWelcomeTitle">...Loading</div>
      ) : (
        <h2 className="userWelcomeTitle">
          Welcome <br /> {userDetails.first}
        </h2>
      )}
      <input className="fileUpload" accept="image/*" multiple type="file" onChange={(e)=>{setImages(e.target.files)}} />
      {images? <button className="uploadButton" onClick={()=>uploadFile()}>Upload</button>:null}

    </>
  );
}
