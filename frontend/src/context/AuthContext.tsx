import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("fleetdash:token") || sessionStorage.getItem("fleetdash:token");
    } catch {
      return null;
    }
  });

  const [rememberToken, setRememberToken] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem("fleetdash:token"));
    } catch {
      return false;
    }
  });

  const navigate = useNavigate();
  const isAdmin = Boolean(token);

  useEffect(() => {
    try {
      // Persist token to the chosen storage
      if (!token) {
        localStorage.removeItem("fleetdash:token");
        sessionStorage.removeItem("fleetdash:token");
        return;
      }

      if (rememberToken) {
        localStorage.setItem("fleetdash:token", token);
        sessionStorage.removeItem("fleetdash:token");
      } else {
        sessionStorage.setItem("fleetdash:token", token);
        localStorage.removeItem("fleetdash:token");
      }
    } catch {}
  }, [token, rememberToken]);

  async function login(username: string, password: string, remember = false) {
    try {
      const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5173";
      const resp = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!resp.ok) {
        setToken(null);
        return false;
      }

      const data = await resp.json();

      if (data && data.token) {
        setRememberToken(Boolean(remember));
        setToken(data.token);
        navigate("/", { replace: true });
        return true;
      }

      setToken(null);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setToken(null);
      return false;
    }
  }

  function logout() {
    setToken(null);
    setRememberToken(false);
    try {
      localStorage.removeItem("fleetdash:token");
      sessionStorage.removeItem("fleetdash:token");
    } catch {}
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");

  return ctx;
}

export default AuthContext;
