import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import MyExpenses from "./pages/MyExpenses";
import EditExpense from "./pages/EditExpense";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<AddExpense />} />
        <Route path="/my-expenses" element={<MyExpenses />} />
        <Route path="/edit/:id" element={<EditExpense />} />
      </Routes>
    </Router>
  );
}

export default App;