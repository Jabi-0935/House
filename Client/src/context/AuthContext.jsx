import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [Loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const authToken = localStorage.getItem("authtoken");
    if (savedUser && authToken) {
      setUser(JSON.parse(savedUser));
      setAuthToken(authToken);
    }
  },[]);

  const login = (userData, token) => {
    setUser(userData);
    setAuthToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authtoken", authToken);
  };
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authtoken");
  };

  const value = {
    user,
    authToken,
    isAuthenticated: !!user && !!authToken,
    login,
    logout,
    Loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
