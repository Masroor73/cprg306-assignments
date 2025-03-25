"use client";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Week 9: Firebase Auth</h1>

      {!user && (
        <div>
          <p className="mb-4">You are not logged in. Please sign in with GitHub.</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign in with GitHub
          </button>
        </div>
      )}

      {user && (
        <div>
          <p className="mb-4">
            Welcome, <strong>{user.displayName}</strong>{" "}
            {user.email ? `(${user.email})` : ""}
          </p>

          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>

            <Link
              href="/week-9/shopping-list"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Go to Shopping List
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

