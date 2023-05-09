// import { useEffect, useState } from "react";
// import { useContext } from "react";
// import { auth, User } from "../firebase";
// import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// const AuthContext = React.createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();

//   const signUp = (email, password) => {
// return createUserWithEmailAndPassword(auth,email,password)
//   };
  
// useEffect(()=>{
//     const unsubscribe =  onAuthStateChanged(auth, user=>{
//     setCurrentUser(user)
//     return unsubscribe
// },[])


//   })

//   const value = {
//     currentUser,
//     signUp
//   };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
