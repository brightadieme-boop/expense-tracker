import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  // 1. Get the Token
  const token = localStorage.getItem("token");
  
  // 2. Get the User Object (Safely!)
  // We have to JSON.parse it because it was saved as a string text
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  // 3. Fallback name just in case the database didn't send one
  const userName = user?.full_name || "Friend";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav style={styles.nav}>
      <h1 
        style={styles.logo} 
        onClick={() => navigate(token ? "/dashboard" : "/login")}
      >
        MoniTrackr 💸
      </h1>

      <div style={styles.links}>
        {token ? (
          /* --- LOGGED IN --- */
          <>
            {/* The Friendly Greeting */}
            <span style={styles.greeting}>
              Hello, <span style={styles.nameHighlight}>{user.full_name}</span> ! 👋, how's life?
            </span>

            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/expenses" style={styles.addBtn}>Add Expense</Link>
            <Link to="/my-expenses" style={styles.link}>My Expenses</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          /* --- LOGGED OUT --- */
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// --- STYLES ---
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
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
    margin: 0,
    color: "#34d399",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  greeting: {
    color: "#9ca3af", // Soft gray so it doesn't distract too much
    fontSize: "0.95rem",
    marginRight: "10px", // Push it a bit away from the buttons
    fontWeight: "500",
  },
  nameHighlight: {
    color: "#fff", // Make the name bright white
    fontWeight: "bold",
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  addBtn: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px", // Makes it rounded(pill shape)
    textDecoration: "none",
    fontWeight: "bold", 
    fontSize: "0.9rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    marginLeft: "10px", //adds a little breathing room
  },
  logoutBtn: {
    backgroundColor: "#7e6d11ff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  registerBtn: {
    backgroundColor: "#34d399",
    color: "#1f2937",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    fontWeight: "bold",
  }
};

export default Navbar;