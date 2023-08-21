import React from "react";
import { useAuth } from "../context/AuthContext";
import {Link} from "react-router-dom";

export default function Header() {
  const { logout, headerLoading, loggedOut, currentUser, loading, showPreview } = useAuth();

  return (
    <>
      <nav>
        {currentUser && !loggedOut ? (
          <button className={ showPreview? "uploading":null} onClick={() => logout()}>Logout</button>
        ) : null}
        <Link  className={ showPreview? "uploading":null} to={"/"}>Home</Link>
        {loading ? (
          <div>...Loading</div>
        ) : !loggedOut ? (
          <Link className={ showPreview? "uploading":null} to={"/Dashboard"}>Dashboard</Link>
        ) : (
          <Link to={"/Login"}>Login</Link>
        )}
      </nav>
      <h1 className={ showPreview? "appHeader uploading":"appHeader"}>Store&lt;Im/&gt; </h1>
    </>
  );
}
