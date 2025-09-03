"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  username: string | null;
  setUsername: (name: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ username, setUsername, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
