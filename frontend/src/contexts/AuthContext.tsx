import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Company } from "@/types";
import { authApi } from "@/services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  company: Company | null;
  isLoading: boolean;
  login: (token: string, company: Company) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { company } = await authApi.me();
          setCompany(company);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("companySlug");
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (token: string, company: Company) => {
    localStorage.setItem("token", token);
    localStorage.setItem("companySlug", company.slug);
    setCompany(company);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("companySlug");
    setCompany(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, company, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
