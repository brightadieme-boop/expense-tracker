import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    // if no token, user is not logged in, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // if token exists, allow access to the child routes
    return <Outlet />;
};

