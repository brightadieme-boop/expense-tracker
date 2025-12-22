import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import "./styles/main.css";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyExpenses from "./pages/MyExpenses.jsx";
import AddExpense from "./pages/AddExpense.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import EditExpense from "./pages/EditExpense.jsx";
import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";

// This attaches React to the HTML <div id="root"> inside index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
     <Navbar />
     <Routes>

      <Route path="/" element={<Landing />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes*/}
      <Route element={<ProtectedRoute />}>
         <Route path="/" element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/my-expenses" element={<MyExpenses />} />
         <Route path="/expenses" element={<AddExpense />} />
         <Route path="/edit/:id" element={<EditExpense /> } />
         <Route path="/register" element={<Register /> } />
      </Route>

     </Routes>
  </BrowserRouter>
);