/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.js";
import { config } from "../utils/config.js";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      return <Navigate to="/" />;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/validate-token`,
        {},
        config(user),
      )
      .then(() => {})
      .catch((error) => {
        console.log(error);
        logout();
      });
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
