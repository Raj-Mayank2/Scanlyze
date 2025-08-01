import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // On mount, try to read user info from localStorage (persist login)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Login function calling backend API
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const loggedInUser = response.data.user; // {name, email}
      const token = response.data.token; // token from backend

      // Save user along with token
      const userWithToken = { ...loggedInUser, token };
      setUser(userWithToken);
      localStorage.setItem("user", JSON.stringify(userWithToken));

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Login failed");
      return { success: false, message: err.response?.data?.error || "Login failed" };
    }
  };

  // Signup function calling backend API
  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/auth/register", { name, email, password });
      // After signup, usually login automatically:

      const loginResult = await login(email, password);

      setLoading(false);
      if (loginResult.success) {
        return { success: true };
      } else {
        return loginResult;
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Signup failed");
      return { success: false, message: err.response?.data?.error || "Signup failed" };
    }
  };

  // Logout user and clear storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
