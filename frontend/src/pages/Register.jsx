import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const userData = {
            full_name: full_name,
            email: email,
            password: password,
        };

        try {
            const response = await fetch("https://expense-backend-gviv.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

    

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
        <div style={{ padding: "20px" }}>
            <h2>Create an Account</h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" style={{ marginTop: "10px" }}>Register</button>
            </form>
        </div>
    );
};
