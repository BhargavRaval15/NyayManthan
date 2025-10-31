import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.errors?.[0]?.msg || "Login failed");
        return;
      }
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login
        </h2>
        <div className="mb-4 text-center text-primary-600 dark:text-primary-400 font-semibold">
          Login to access AI features.
        </div>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600 dark:text-gray-300">
            Don't have an account?
          </span>
          <button
            type="button"
            className="ml-2 text-primary-600 dark:text-primary-400 underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
