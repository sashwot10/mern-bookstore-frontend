import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    console.log("User Data:", userData); // Ensure the user data is being passed correctly
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
    setUser(userData); // Set the user in state
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // Access the context value
};