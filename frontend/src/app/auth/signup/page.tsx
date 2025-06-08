"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleButton from "../../components/common/button";
import { signUpWithEmail, signUpWithGoogle } from "../../lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignupWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const success = await signUpWithEmail(email, password);

      if (success) {
        router.push("/");
      } else {
        setError("Failed to sign up. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupWithGoogle = async () => {
    setError("");
    setIsLoading(true);

    try {
      const success = await signUpWithGoogle();

      if (success) {
        router.push("/");
      } else {
        setError("Failed to sign up with Google. Please try again.");
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
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <GoogleButton
          onClick={handleSignupWithGoogle}
          text={isLoading ? "Signing up..." : "Signup with Google"}
        />
      </div>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <p className="mx-4 text-sm text-gray-400">or</p>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <form onSubmit={handleSignupWithEmail}>
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

        <button
          type="submit"
          className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up with Email"}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-gray-800 font-bold">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}