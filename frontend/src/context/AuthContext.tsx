import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthUser {
  username: string;
  role: string;
}

interface AuthContextType {
  isAdmin: boolean;
  user: AuthUser | null;
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

  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const storedUser = sessionStorage.getItem("fleetdash:user") || localStorage.getItem("fleetdash:user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    } catch {}

    return null;
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
      const apiUrl = import.meta.env.VITE_API_URL;
      const isLocalhostUrl = apiUrl?.includes("localhost") || apiUrl?.includes("127.0.0.1");
      const API_BASE = import.meta.env.PROD && isLocalhostUrl ? "https://fleetdash-backend.onrender.com" : apiUrl || window.location.origin;
      const requestUrl = `${API_BASE}/api/auth/login`;

      console.debug("FleetDash login request URL:", requestUrl);

      const resp = await fetch(requestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        console.warn("FleetDash login failed:", resp.status, resp.statusText, requestUrl, data);
        setToken(null);
        return false;
      }

      if (data && data.token) {
        const nextUser = {
          username: data.username || username,
          role: data.role || "admin",
        };

        setRememberToken(Boolean(remember));
        setToken(data.token);
        setUser(nextUser);

        try {
          sessionStorage.setItem("fleetdash:user", JSON.stringify(nextUser));
          if (remember) {
            localStorage.setItem("fleetdash:user", JSON.stringify(nextUser));
          } else {
            localStorage.removeItem("fleetdash:user");
          }
        } catch {}

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
    setUser(null);
    try {
      localStorage.removeItem("fleetdash:token");
      sessionStorage.removeItem("fleetdash:token");
      localStorage.removeItem("fleetdash:user");
      sessionStorage.removeItem("fleetdash:user");
    } catch {}
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ isAdmin, user, login, logout }}>
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
