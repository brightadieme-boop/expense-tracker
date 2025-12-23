import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/main.css"; 

const Navbar = () => {
  const navigate = useNavigate();
  // Check if the user has a "Key" (token) in their pocket
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    // Throw away the key and go to Login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar" style={{ zIndex: 9999, position: "relative" }}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Money Tracker
        </Link>
      </div>
      
      <ul className="nav-links" style={{ display: "flex", gap: "20px", listStyle: "none", alignItems: "center" }}>
        
        {isAuthenticated ? (
          /* SHOW THESE IF LOGGED IN */
          <>
            <li><Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link></li>
            <li><Link to="/my-expenses" style={{ color: "white", textDecoration: "none" }}>My Expenses</Link></li>
            <li><Link to="/expenses" style={{ color: "white", textDecoration: "none" }}>Add Expense</Link></li>
            <li>
              <button onClick={handleLogout} style={{ cursor: "pointer", background: "red", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px" }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          /* SHOW THESE IF LOGGED OUT */
          <>
            <li><Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link></li>
            <li>
               <Link to="/register">
                 <button style={{ cursor: "pointer", padding: "8px 15px" }}>Register</button>
               </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

