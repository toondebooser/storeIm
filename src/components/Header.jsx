import React from "react";
import { useAuth } from "../context/AuthContext";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";


export default function Header() {
const auth = useAuth();
const user = auth.currentUser;
console.log(user);

  return (
    <>
    
      <nav>
        <button >click me</button>
        <Link to={'/'}>Home</Link>

        {  user !== null ? <Link to={'/Dashboard'}>Dashboard</Link> : <Link to={'/Login'}>Login</Link> }
      </nav>
      <h1 className="appHeader">Store&lt;Im/&gt; </h1>
    </>
  );
}
