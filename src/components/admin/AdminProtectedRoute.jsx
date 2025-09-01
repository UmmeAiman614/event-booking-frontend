// src/components/common/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children, allowedRoles }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    // Not logged in → go to login
    return <Navigate to="/signIn" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but not in allowed roles
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
