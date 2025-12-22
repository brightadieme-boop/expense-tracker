import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f0f2f5" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Money Tracker</h1>
      <Link to="/login">
        <button style={{ padding: "15px 30px", fontSize: "1.2rem", background: "blue", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Login / Register
        </button>
      </Link>
    </div>
  );
}
