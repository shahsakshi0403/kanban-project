// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }

  return children;
};

export default PrivateRoute;
