"use client";

import { useState } from "react";
import { UsersList } from "@/components/admin/UsersList";

export default function AdminUsersPage() {
  const [adminToken, setAdminToken] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTokenError(null);

    if (!adminToken.trim()) {
      setTokenError("Admin token is required");
      return;
    }

    try {
      // Verify token by making a test API call
      const response = await fetch(`/api/admin/users?page=1&perPage=1`, {
        method: "GET",
        headers: {
          "x-internal-admin-token": adminToken.trim(),
        },
      });

      if (!response.ok) {
        setTokenError("Invalid admin token");
        return;
      }

      setShowUsers(true);
    } catch (err) {
      setTokenError("Failed to verify token");
    }
  };

  if (!showUsers) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg bg-white p-8 shadow">
            <h1 className="mb-2 text-2xl font-semibold text-gray-900">Admin Access</h1>
            <p className="mb-8 text-gray-600">Enter your admin token to view all users</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tokenError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {tokenError}
                </div>
              )}

              <div>
                <label htmlFor="admin-token" className="block text-sm font-medium text-gray-900">
                  Admin Token
                </label>
                <input
                  id="admin-token"
                  type="password"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  placeholder="Enter your INTERNAL_ADMIN_TOKEN"
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Access Users
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">All Users</h1>
            <p className="mt-1 text-gray-600">Manage and view platform users</p>
          </div>
          <button
            onClick={() => {
              setShowUsers(false);
              setAdminToken("");
            }}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-300"
          >
            Logout
          </button>
        </div>

        <UsersList adminToken={adminToken} />
      </div>
    </main>
  );
}
