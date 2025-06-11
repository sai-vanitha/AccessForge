import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Invalid user in localStorage");
    return null;
  }
});

  const login = (userData) => {
  localStorage.setItem("token", userData.token);
  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData);
};

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully!");
    localStorage.clear();
  };

  const updateUser = (updatedFields) => {
  setUser((prevUser) => {
    const updated = { ...prevUser, ...updatedFields };
    localStorage.setItem("user", JSON.stringify(updated));
    return updated;
  });
};


  return (
    <AuthContext.Provider value={{ user, setUser , login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
