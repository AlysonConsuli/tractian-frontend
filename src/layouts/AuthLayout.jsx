import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/homepage" />;
  }

  return <Outlet />;
};
