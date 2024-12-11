import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../services/apiConfig";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    loading: true,
  });
  // Fetch user details from the backend
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/sucess", {
        withCredentials: true,
      });
      setUser(response.data.user);
      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    window.open("http://localhost:5000/logout", "_self");
    setAuthState({ user: null, isAuthenticated: false, loading: false });
  };
  useEffect(() => {
    fetchUser(); // Fetch user data on app load
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, authState }}>
      {children}
    </AuthContext.Provider>
  );
};
