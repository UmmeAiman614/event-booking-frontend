// src/components/common/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    // Redirect to sign-in if not logged in
    return <Navigate to="/signIn" replace />;
  }

  return children;
};

export default ProtectedRoute;
