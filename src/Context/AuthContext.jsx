import React, { createContext, useState, useEffect } from "react";
import API from "../api";

// Create a context for authentication
export const AuthContext = createContext();

// Define a provider component for the AuthContext
export const AuthContextProvider = ({ children }) => {
  // State to hold the current user, initialized from local storage
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    try {
      // Parse the user data from local storage if it exists
      return user ? JSON.parse(user) : null;
    } catch {
      // Return null if there is an error parsing the user data
      return null;
    }
  });

  // State to hold the authentication token, initialized from local storage
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("utoken");
    // Return the token if it exists, otherwise return null
    return token || null;
  });

  // Effect to synchronize currentUser state with local storage
  useEffect(() => {
    console.log("Current user updated: ", currentUser);
    if (currentUser) {
      // Save currentUser to local storage when it changes
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      // Remove user from local storage if currentUser is null
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  // Effect to synchronize token state with local storage
  useEffect(() => {
    console.log("Token updated: ", token);
    if (token) {
      // Save token to local storage when it changes
      localStorage.setItem("utoken", token);
    } else {
      // Remove token from local storage if token is null
      localStorage.removeItem("utoken");
    }
  }, [token]);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      // Send login request to the API
      const { data } = await API.post("/api/Auth/login", { email, password });
      console.log("Login response data: ", data);
      // Update currentUser and token states with the response data
      setCurrentUser({ email: data.email });
      setToken(data.token);
    } catch (error) {
      // Log and rethrow error if login fails
      console.error("Login error: ", error);
      throw error;
    }
  };

  // Function to handle user signup
  const signup = async (email, username, password) => {
    try {
      // Send signup request to the API
      const { data } = await API.post("/api/Auth/registration", {
        email,
        username,
        password,
      });
      console.log("Registration response data: ", data);
      // Update currentUser and token states with the response data
      setCurrentUser({ email: data.email });
      setToken(data.token);
      // Return true if signup is successful
      return true;
    } catch (error) {
      // Log and rethrow error if signup fails
      console.error("Registration error: ", error);
      throw error;
    }
  };

  // Function to handle user logout
  const logout = () => {
    console.log("Logging out");
    // Clear currentUser and token states
    setCurrentUser(null);
    setToken(null);
    // Remove user and token from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("utoken");
  };

  // Return the AuthContext provider with the context value
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
