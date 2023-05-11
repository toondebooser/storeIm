import React from "react";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

export default function Header() {

  const auth = useAuth();
  const currentUser = auth.currentUser;
  const {logout} = useAuth()
  console.log(currentUser);

  return (
    <>
      <nav>
        <button onClick={()=>logout()}>click me</button>
        <Link to={"/"}>Home</Link>
        {currentUser !== null ? (
          <Link to={"/Dashboard"}>Dashboard</Link>
        ) : (
          <Link to={"/Login"}>Login</Link>
        )}
      </nav>
      <h1 className="appHeader">Store&lt;Im/&gt; </h1>
    </>
  );
}
