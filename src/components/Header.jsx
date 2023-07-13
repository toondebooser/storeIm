import React from "react";
import { useAuth } from "../context/AuthContext";
import {Link} from "react-router-dom";

export default function Header() {
  const { logout, headerLoading, loggedOut, currentUser } = useAuth();

  return (
    <>
      <nav>
        {currentUser && !loggedOut ? (
          <button onClick={() => logout()}>Logout</button>
        ) : null}
        <Link to={"/"}>Home</Link>
        {headerLoading ? (
          <div>...Loading</div>
        ) : !loggedOut ? (
          <Link to={"/Dashboard"}>Dashboard</Link>
        ) : (
          <Link to={"/Login"}>Login</Link>
        )}
      </nav>
      <h1 className="appHeader">Store&lt;Im/&gt; </h1>
    </>
  );
}
