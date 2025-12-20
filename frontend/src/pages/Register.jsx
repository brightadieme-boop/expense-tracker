import React, { useState } from "react";

export default function Register() {
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

            if (!response.ok) {
                alert("Registration failed: " + result.detail);
                return;
            }

            alert("Registration successful!");
            window.location.href = "/login";

        } catch (error) {
            alert("Error connecting to server");
            console.error(error);
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
}
