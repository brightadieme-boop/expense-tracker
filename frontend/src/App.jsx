import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import ALL your pages
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyExpenses from "./pages/MyExpenses";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import ProtectedRoute from "./components/protectedRoute"; 

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages (Only for Logged In Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-expenses" element={<MyExpenses />} />
          <Route path="/expenses" element={<AddExpense />} />
          <Route path="/edit/:id" element={<EditExpense />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
