import { useState, useEffect, useCallback } from "react";
import { getAllUsers, type User, type UsersResponse } from "@/lib/api/users";

interface UseGetUsersOptions {
  adminToken: string;
  enabled?: boolean;
}

interface UseGetUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: { page: number; perPage: number; total: number };
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  refetch: () => Promise<void>;
}

export function useGetUsers({
  adminToken,
  enabled = true,
}: UseGetUsersOptions): UseGetUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [pagination, setPagination] = useState({ page: 1, perPage: 50, total: 0 });

  const fetchUsers = useCallback(async () => {
    if (!enabled || !adminToken) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getAllUsers(adminToken, page, perPage);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [adminToken, page, perPage, enabled]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    pagination,
    page,
    setPage,
    perPage,
    setPerPage,
    refetch: fetchUsers,
  };
}
