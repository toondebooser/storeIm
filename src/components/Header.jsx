import React from "react";
import { getAuth } from "firebase/auth";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

const auth = getAuth();
const user = auth.currentUser;
console.log(user);

export default function Header() {
  return (
    <>
    
      <nav>
        <button >click me</button>
        <Link to={'/'}>Home</Link>
        {  (user !== null) ? (
           <Link to={'/Dashboard'}>Dashboard</Link>
          ) : (
            <Link to={'/Login'}>Login</Link>
          )}
      </nav>
      <h1 className="appHeader">Store&lt;Im/&gt; </h1>
    </>
  );
}
