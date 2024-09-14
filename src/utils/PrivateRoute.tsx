import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useContext(UserContext) || { user: null };
  console.log(user);

  const isAuthenticated = user && user.isAdmin;
  console.log(isAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
