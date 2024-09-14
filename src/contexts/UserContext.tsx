import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Define types for the user and the context
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if the user is already logged in by checking the cookie/session
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/users/getUser");
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
