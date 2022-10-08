import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useAuth = () => {
  const context = useContext(UserContext);
  return context;
};
