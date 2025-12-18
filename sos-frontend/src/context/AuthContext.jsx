import React, { createContext, useContext, useEffect, useState } from "react";
import { loginApi, meAuthApi, logoutApi } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const res = await meAuthApi();
        setUser(res.data?.data || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadMe();
  }, []);

  const login = async (payload) => {
    const res = await loginApi(payload);
    setUser(res.data?.data?.user);
    return res;
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
