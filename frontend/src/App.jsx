import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
// import Register from "./pages/Register"; // Uncomment when you need it
// import Dashboard from "./pages/Dashboard"; // Uncomment when you need it

function App() {
  return (
    <Router>
      {/* Navbar sits OUTSIDE the Routes so it is always visible and active */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
