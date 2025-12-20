import {UseEffect, useState } from "react";
import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"; //stylrsheet we will create
import { useLocation } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

function Navbar() {
  const location = useLocation();

  if (location.pathname === "/") return null;
    return (
        <nav className="navbar">
            <div className="logo">Expense Tracker</div>

             
            <ul className="nav-links">

                {/* Always visible */}
                <li className={location.pathname === "/dashboard" ? "active" : ""}>
                 <Link to="/dashboard">Dashboard</Link>
                </li>

                <Link to="/my-expenses" style={{ marginLeft: "20px" }}>My Expenses</Link>

                <li className={location.pathname === "/expenses" ? "active" : ""}>

                 <Link to="/expenses">Add Expense</Link>
                </li>
                 {/* If NO user is logged in , show Login/Register */}

                {!user && ( 
              <>

              <li className={location.pathname === "/login" ? "active" : ""}>
               <Link to="/login">Login</Link>
              </li>

              <li className={location.pathname === "/Register" ? "active" : ""}>
                <Link to="/Register">Register</Link>
              </li>

              </>
              )}

              {/* If user is logged  in ,  show "hi, name" and Logout*/}
              {user && (
                <>
                  <li>Hello! {user.full_name} , how's life?</li>
                  <li>
                    <button
                     onClick={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/login";
                     }}
                    > 
                      Logout
                    </button>
                  </li>
                </>
              )}
                
            
            </ul>
        </nav>
    );
}

export default Navbar;