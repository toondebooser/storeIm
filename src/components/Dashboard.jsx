import { useAuth } from "../context/AuthContext"


export default function Dashboard() {
  const {currentUser, getData} = useAuth()
  const data = getData()
 
  return (
    <>
   <h1>Welcome {
     !currentUser? <div>...Loading</div>:
     currentUser.email} </h1>
     {/* <p>{}</p> */}
     </>
  )
}
