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
    
  }
}
dataFetch()

  return (
    <>
      {loading ? (
        <div>...Loading</div>
      ) : (
        <h2 className="userWelcomeTitle">
          Welcome <br /> {userDetails.first}
        </h2>
      )}
    
    {/* <h2> {loading?<div>...Loading</div>: userDetails.email }</h2> */}
     </>
  )
}
