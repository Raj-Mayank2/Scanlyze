import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { user, login, signup, logout, loading, error } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    setLocalError("");
  }, [error, isLoginMode]);

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Welcome, {user.name}!</h2>
        <button
          onClick={logout}
          disabled={loading}
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Logout
        </button>

        <p className="mt-10 text-sm text-gray-500">
          Created with ❤️ by <span className="font-semibold">Mayank Raj</span>
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.email || !formData.password || (!isLoginMode && !formData.name)) {
      setLocalError("Please fill all required fields.");
      return;
    }

    if (isLoginMode) {
      const result = await login(formData.email, formData.password);
      if (!result.success) setLocalError(result.message);
    } else {
      const result = await signup(formData.name, formData.email, formData.password);
      if (!result.success) setLocalError(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-xl">
      {/* Logo or Heading */}
      <div className="flex items-center justify-center mb-6 space-x-3">
        {/* Example SVG Logo Placeholder */}
        <svg
          className="w-10 h-10 text-indigo-600 animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <h1 className="text-4xl font-extrabold text-indigo-600 select-none">Scanlyze</h1>
      </div>

      {/* Welcome Message / Quote */}
      <p
        className="mb-8 text-center text-lg text-gray-700 italic font-semibold"
        style={{ userSelect: "none" }}
      >
        "Your resume is your first impression—make it unforgettable."
      </p>

      {/* Auth Form */}
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        {isLoginMode ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {!isLoginMode && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            disabled={loading}
            required={!isLoginMode}
            className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          disabled={loading}
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          disabled={loading}
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />

        {(localError || error) && (
          <p className="text-center text-sm text-red-600" role="alert">
            {localError || error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center rounded-md px-6 py-3 font-semibold text-white transition ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Processing...
            </>
          ) : isLoginMode ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setLocalError("");
            setFormData({ name: "", email: "", password: "" });
            setIsLoginMode(!isLoginMode);
          }}
          disabled={loading}
          className="font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline"
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </p>

      {/* Creator Credit */}
      <p className="mt-12 text-center text-xs text-gray-400 select-none">
        Created by <span className="font-semibold">Mayank Raj</span>
      </p>
    </div>
  );
};

export default Auth;
