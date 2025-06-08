"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "./lib/auth";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is authenticated (this would normally use a more robust method)
  const isAuthenticated = true; // Simulated authentication state

  useEffect(() => {
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const success = await logout();

      if (success) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to Pomofocus</h1>
        <p className="text-center mb-8">You have successfully logged in!</p>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Log out"}
        </button>
      </div>
    </div>
  );
}