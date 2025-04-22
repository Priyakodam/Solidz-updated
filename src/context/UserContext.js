// In your context file (like UserContext.js)
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <UserContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
