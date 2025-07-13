import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuth") === "true";
  });

  const updateAuth = (auth: boolean) => {
    setIsAuthenticated(auth);
    localStorage.setItem("isAuth", String(auth));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
