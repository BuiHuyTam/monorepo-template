"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleButton from "../../components/common/button";
import { loginWithEmail, loginWithGoogle } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await loginWithEmail(email, password);

      if (success) {
        router.push("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setError("");
    setIsLoading(true);

    try {
      const success = await loginWithGoogle();

      if (success) {
        router.push("/");
      } else {
        setError("Failed to log in with Google. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Log In</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <GoogleButton
          onClick={handleLoginWithGoogle}
          text={isLoading ? "Logging in..." : "Log in with Google"}
        />
      </div>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <p className="mx-4 text-sm text-gray-400">or</p>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md"
            placeholder="example@mail.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-gray-800 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
} 