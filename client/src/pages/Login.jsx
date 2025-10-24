import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      setAuthenticated(true);
    } catch (error) {
      console.log("Erreur de connexion");
    }
  };

  if (isAuthenticated) return <Navigate to="/application" replace />;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-semibold text-gray-900">
          Sign in to coffercard
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="email"
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="group w-full py-2 px-4 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            type="submit"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
