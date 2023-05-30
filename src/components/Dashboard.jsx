import { documentId } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";






export default function Dashboard() {
    const {currentUser, getUserDetails, stopLoading} = useAuth()
    const [userDetails, setUserDetails] = useState()
    const [loading, setLoading] = useState(true);
  
const dataFetch = async () =>{
  const document = await getUserDetails()
  if(document && loading){
    setLoading(false);
    setUserDetails(document)
    console.log(userDetails);
    return document;

  }
}
dataFetch()




// useEffect( () => {

//   const fetchData = async () => {
    
      
//     const document = await getUserDetails()
//       console.log(document) 
      
//       console.log(document);
//       console.log("here");  
//       if(document !== userDetails){
        
//         if (document === userDetails) {
//           return;
//       }
//       else{
//         setUserDetails(document)
//         console.log("details are set");
//         setLoading(false);
//       }
//     }
    
//   }

//   if (!isMounted) {
//     fetchData();
//     setIsMounted(true);
//   }
// }, [])


  return (
    <>
   <h1>Welcome {
     !currentUser? <div>...Loading</div>:
     currentUser.email} </h1>
    <h2> {loading?<div>...Loading</div>: userDetails.email }</h2>
     </>
  )
}
