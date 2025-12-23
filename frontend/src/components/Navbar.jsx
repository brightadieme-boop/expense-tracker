import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  // 1. Get Token & User Info
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.full_name || "Friend";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="nav-container" style={styles.nav}>
        {/* Logo */}
        <h1 
          style={styles.logo} 
          onClick={() => navigate(token ? "/dashboard" : "/")}
        >
          MoniTrackr 💸
        </h1>

        {/* Links Section */}
        <div className="nav-links" style={styles.links}>
          {token ? (
            /* --- LOGGED IN MENU --- */
            <>
              {/* Hide "Hello" on very small phones to save space, or keep it centered */}
              <span className="nav-greeting" style={styles.greeting}>
                Hello, <span style={styles.nameHighlight}>{user.full_name}</span>! 👋, how's life?
              </span>

              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              <Link to="/my-expenses" style={styles.link}>My Expenses</Link>
              
              {/* Add Button */}
              <Link to="/expenses" style={styles.addBtn}>
                + Add Expenses
              </Link>

              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            /* --- PUBLIC MENU --- */
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* --- RESPONSIVE CSS INJECTION --- */}
      <style>{`
        /* Default Desktop Layout is handled by the inline styles below */

        /* MOBILE LAYOUT (For screens smaller than 768px) */
        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column; /* Stack logo on top of links */
            padding: 1rem !important;
            gap: 15px;
          }
          
          .nav-links {
            width: 100%;
            justify-content: center; /* Center the buttons */
            flex-wrap: wrap; /* Allow buttons to drop to next line */
            gap: 15px !important; /* Space between wrapped buttons */
          }

          .nav-greeting {
            display: block;
            width: 100%;
            text-align: center;
            margin-right: 0 !important;
            margin-bottom: 5px;
          }
        }
      `}</style>
    </>
  );
};

// --- BASE STYLES ---
const styles = {
  nav: {
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    padding: "1rem 2rem", 
    backgroundColor: "#1f2937", 
    color: "white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
    position: "relative", 
    zIndex: 9999,
  },
  logo: { fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", color: "#34d399", margin: 0 },
  links: { display: "flex", gap: "20px", alignItems: "center" },
  greeting: { color: "#9ca3af", fontSize: "0.9rem", marginRight: "10px", fontWeight: "500" },
  nameHighlight: { color: "#fff", fontWeight: "bold" },
  link: { color: "#e5e7eb", textDecoration: "none", fontSize: "1rem", fontWeight: "600" },
  
  // Pill Button
  addBtn: {
    backgroundColor: "#071e59ff", 
    color: "white", padding: "8px 16px", borderRadius: "20px",
    textDecoration: "none", fontWeight: "bold", fontSize: "0.9rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    whiteSpace: "nowrap", // Prevents text from breaking inside button
  },
  
  logoutBtn: { backgroundColor: "#51520aff", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
  registerBtn: { backgroundColor: "#096846ff", color: "#1f2937", textDecoration: "none", padding: "8px 16px", borderRadius: "5px", fontWeight: "bold" }
};

export default Navbar;