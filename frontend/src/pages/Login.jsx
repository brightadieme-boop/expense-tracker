import React, { useState } from "react";
import ParticlesBackground from "../components/ParticleBackground";

function Login() {

    //------------------------------------------
    //  REACT STATE (think: variable that re-render the UI when they change )
    //------------------------

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //-------------------------
    // HANDLE SUBMIT (for now: just shows data)
    //------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();

            console.log("LOGIN RESPONSE:", data);

            if(response.ok) {
                alert("Login successful! Welcome " + data.user.full_name);
                
                // Save user and token
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user",JSON.stringify(data.user));

                //Redirect
                window.location.href = "/dashboard";
                return;
            }

            alert("Login successful!");

            alert("Login failed " + data.error);

            // later we will navigate to dashboard
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    };

    //----------------------------------
    // JSX = THE UI YOU SEE ON TH SCREEN
    //---------------------

    return (

     <>
       <ParticlesBackground />
        <div className="login-page">
            <h1>Register or Login</h1>

            {/* form wrapper*/}
            <form className="login-form" onSubmit={handleSubmit}>

                {/* Email Input */}
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Please Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input*/}
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>

            </form>
        </div>
      </>
    );
}

export default Login;