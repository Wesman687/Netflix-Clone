import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import caret_icon from "../../assets/caret_icon.svg";
import profile_img from "../../assets/profile_img.png";
import { auth, logout } from "../../Firebase";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
const Navbar = () => {
  const [signState, setSignState] = useState("Sign In")
  useEffect(() => {
    onAuthStateChanged(auth, async(user)=> {
      if (user) {
        setSignState("Sign Out")
      }
      else {
        setSignState("Sign In")
      }
    })
    
  }, [])

  const navRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);
  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My list</li>
          <li>Browse Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" />
        <p>Children</p>
        <img src={bell_icon} alt="" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            
              <p
                onClick={() => {
                  logout();
                }}
              >
                Sign Out of Netflix
              </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
