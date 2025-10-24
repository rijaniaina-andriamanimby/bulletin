import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("access_token");

    // Si pas de token → redirection vers la page login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Sinon → accès autorisé
    return <Outlet />;
};

export default ProtectedRoute;
