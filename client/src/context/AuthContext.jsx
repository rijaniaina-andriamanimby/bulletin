import { useState, useEffect, createContext, useContext } from "react";
import api from "../service/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post(`/token/`, {
        email: credentials.email,
        password: credentials.password,
      });

      const { access, refresh, user: userData } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  };

  const logout = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    try {
      await api.post(`/deconnexion/`, { refresh_token });
    } catch (err) {
      console.warn("Erreur à la déconnexion :", err);
    }

    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
