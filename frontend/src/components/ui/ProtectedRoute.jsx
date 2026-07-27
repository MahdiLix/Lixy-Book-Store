import { Navigate } from "react-router-dom";
import { isLoggedIn, getUserRole } from "../../utils/auth";

export default function ProtectedRoute({ children, requiredRoles }) {
  const loggedIn = isLoggedIn();
  const userRole = getUserRole();

  if (!loggedIn) {
    return <Navigate to="/user/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
