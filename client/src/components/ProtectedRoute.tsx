import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: string[];
};

function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, token, loading } = useAuth();

console.log("ProtectedRoute");
console.log("token:", token);
console.log("user:", user);
console.log("allowedRoles:", allowedRoles);

console.log({
  loading,
  token,
  user,
  allowedRoles,
});

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "customer":
        return <Navigate to="/customer/dashboard" replace />;

      case "owner":
        return <Navigate to="/owner/dashboard" replace />;

      case "root_admin":
        return <Navigate to="/admin/dashboard" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;