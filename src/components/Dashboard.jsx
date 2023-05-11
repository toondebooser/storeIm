import { useAuth } from "../context/AuthContext"


export default function Dashboard() {
  const {currentUser} = useAuth()
  return (
   <h1>Welcome {
    !currentUser? <div>...Loading</div>:
    currentUser.email} </h1>
  )
}
