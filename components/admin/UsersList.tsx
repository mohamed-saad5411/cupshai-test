"use client";

import { useState, useEffect } from "react";
import { getAllUsers, type User } from "@/lib/api/users";

interface UsersListProps {
  adminToken: string;
}

export function UsersList({ adminToken }: UsersListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllUsers(adminToken, page, 50);
        setUsers(data.users);
        setTotalPages(Math.ceil(data.pagination.total / data.pagination.perPage));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, adminToken]);

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created At</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Sign In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{user.id.slice(0, 8)}...</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    {user.role || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">No users found</div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages} ({users.length} users)
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={page >= totalPages}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
