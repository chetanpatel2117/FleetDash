import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthUser {
  username: string;
  role: string;
}

interface AuthContextType {
  isAdmin: boolean;
  user: AuthUser | null;
  login: (username: string, password: string, remember?: boolean) => Promise<{ ok: boolean; message?: string }>;
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

      if (import.meta.env.PROD && !apiUrl) {
        const message = "VITE_API_URL is not configured for production. Set the backend URL in Vercel environment variables.";
        console.error(message);
        return { ok: false, message };
      }

      if (import.meta.env.PROD && isLocalhostUrl) {
        const message = "VITE_API_URL is set to localhost in production. Update Vercel environment variables with the deployed backend URL.";
        console.error(message, { apiUrl });
        return { ok: false, message };
      }

      const API_BASE = apiUrl || window.location.origin;
      const requestUrl = `${API_BASE.replace(/\/$/, "")}/api/auth/login`;

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
        return { ok: false, message: data?.message || `Login request failed with status ${resp.status} ${resp.statusText}.` };
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
        return { ok: true };
      }

      setToken(null);
      return { ok: false, message: data?.message || "Unable to sign in right now." };
    } catch (error) {
      console.error("Login error:", error);
      setToken(null);
      return { ok: false, message: "Unable to sign in right now. Please verify the backend URL and credentials." };
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
