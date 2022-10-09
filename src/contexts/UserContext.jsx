import { createContext, useState } from "react";
import { getLocalStorage } from "../utils/useLocalStorage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userLocal = getLocalStorage("user");

  const [user, setUser] = useState(userLocal);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
