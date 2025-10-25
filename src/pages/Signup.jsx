import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/users";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      registerUser(email, password);
      setSuccess("Account created. You can now log in.");
      // After signup, send them to login page
      setTimeout(() => {
        navigate("/auth/login");
      }, 500);
    } catch (err) {
      setError(err.message || "Could not create account.");
    }
  }

  return (
    <div className="w-full max-w-sm bg-[#0f172a] border border-[rgba(80,80,255,0.4)] shadow-[0_30px_80px_rgba(80,80,255,0.2)] rounded-xl p-6 text-left">
      <h1 className="text-xl font-semibold text-white">Create account</h1>
      <p className="text-sm text-gray-400 mt-1">Get access to TicketApp.</p>

      {error && (
        <div className="mt-4 text-sm text-red-400 bg-red-900/20 border border-red-500/40 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 text-sm text-green-400 bg-green-900/20 border border-green-500/40 rounded-lg px-3 py-2">
          {success}
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
              setSuccess("");
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
              setSuccess("");
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full text-center font-medium bg-[rgb(80,80,255)] hover:bg-[rgb(100,100,255)] text-white rounded-lg px-4 py-2 text-sm shadow-[0_20px_60px_rgba(80,80,255,0.4)]"
        >
          Sign up
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-6 text-center">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-[rgb(80,80,255)] hover:text-[rgb(100,100,255)]"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
