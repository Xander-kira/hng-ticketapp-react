import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { createSession } from "../utils/auth";
import { validateCredentials } from "../utils/users";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const sessionExpiredMsg = location.state?.message || "";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    // NEW: check if this user actually exists + password matches
    const ok = validateCredentials(email, password);
    if (!ok) {
      setError("Invalid email or password.");
      return;
    }

    // good credentials -> create session + go dashboard
    createSession(email);
    navigate("/app/dashboard");
  }

  return (
    <div className="w-full max-w-sm bg-[#0f172a] border border-[rgba(80,80,255,0.4)] shadow-[0_30px_80px_rgba(80,80,255,0.2)] rounded-xl p-6 text-left">
      <h1 className="text-xl font-semibold text-white">Welcome back</h1>
      <p className="text-sm text-gray-400 mt-1">
        Log in to manage your tickets.
      </p>

      {sessionExpiredMsg && (
        <div className="mt-4 text-sm text-yellow-300 bg-yellow-900/20 border border-yellow-500/40 rounded-lg px-3 py-2">
          {sessionExpiredMsg}
        </div>
      )}

      {error && (
        <div className="mt-4 text-sm text-red-400 bg-red-900/20 border border-red-500/40 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="bg-[#1e253d] border border-gray-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(80,80,255)]"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="bg-[#1e253d] border border-gray-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(80,80,255)]"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full text-center font-medium bg-[rgb(80,80,255)] hover:bg-[rgb(100,100,255)] text-white rounded-lg px-4 py-2 text-sm shadow-[0_20px_60px_rgba(80,80,255,0.4)]"
        >
          Log in
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-6 text-center">
        No account?{" "}
        <Link
          to="/auth/signup"
          className="text-[rgb(80,80,255)] hover:text-[rgb(100,100,255)]"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
