import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useUserStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
