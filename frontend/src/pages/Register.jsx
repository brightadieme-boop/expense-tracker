import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Sending data:", formData); // Debugging line

      const response = await axios.post(
        "https://expense-backend-gviv.onrender.com/register",
        {
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Success!", response.data);
      alert("Account created successfully! Please log in.");
      navigate("/login");

    } catch (err) {
      console.error("Full Error Object:", err);
      
      // Better Error Handling
      if (err.response) {
        // The server answered, but with an error code (400, 500, etc.)
        setError(err.response.data.detail || "Server rejected the request.");
      } else if (err.request) {
        // The request was sent but no answer received (Network/CORS error)
        setError("Network Error: Server didn't respond. (Check CORS or Server Status)");
      } else {
        setError("Error setting up request.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f0f2f5" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center", minWidth: "300px" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Create Account</h2>
        
        {error && <div style={{ color: "red", marginBottom: "15px", padding: "10px", background: "#ffe6e6", borderRadius: "5px" }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: "12px", background: loading ? "gray" : "green", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}
          >
            {loading ? "Creating..." : "REGISTER"}
          </button>
        </form>
        
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Already have an account? <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;