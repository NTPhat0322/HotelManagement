import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/User";
import { tokenService } from "../services/token.service";
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null); // dong nay nghia la
// tao ra 1 kenh de chia se voi toan bo he thong
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const isAuthenticated = !!user;

  const logout = () => {
    setUser(null);
    tokenService.clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phai dc dat trong provider");
  }
  return context;
};
