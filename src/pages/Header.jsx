import React, { useEffect, useState,useContext } from "react";
import "./header.css";
import auth from "./firebase";
import { signOut } from "firebase/auth";
import Sidebar from "./sidebar";
import Store from "./context";
import { Link } from "react-router-dom";

const Header = () => {
  const userEmail = JSON.parse(localStorage.getItem("Email"));
  const [getEmail, setGetEmail] = useState(userEmail);
  const {toggle1} = useContext(Store)

  useEffect(() => {}, [getEmail]);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setGetEmail("");
        localStorage.removeItem("Email");
        window.location.reload();
      })
      .catch((error) => {});
  };

  return (
    <>
      {/* <Sidebar /> */}
     
     
      <header className="highlight_header">
            <Link to="/" className={`backtoHomepage ${toggle1?'backtoHomepage1':''}`}>
              back to homepage
            </Link>

            <form onSubmit={handleLogOut}>
              {getEmail && <span className={`getEmail ${toggle1?'getEmail2':''}`}>{getEmail}</span>}

              <button type="submit" className={`sign-out1 ${toggle1?'sign-out3':''}`}>
                Log-out
              </button>
            </form>
      </header>
      <br />
      <br />
    </>
  );
};

export default Header;
