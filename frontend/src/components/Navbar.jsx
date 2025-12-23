import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css"; // Ensure styles are applied

const Navbar = () => {
  return (
    <nav className="navbar" style={{ zIndex: 9999, position: "relative" }}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Money Tracker
        </Link>
      </div>
      
      <ul className="nav-links" style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        </li>
        <li>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
        </li>
        <li>
           {/* This button is purely for navigation test */}
          <Link to="/register">
             <button style={{ cursor: "pointer", padding: "5px 10px" }}>Register</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
