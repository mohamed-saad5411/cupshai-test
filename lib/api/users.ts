// Utility function to fetch all users from the admin API

export interface User {
  id: string;
  email: string | null;
  role: string | null;
  created_at: string;
  last_sign_in_at: string | null;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
}

export async function getAllUsers(
  adminToken: string,
  page: number = 1,
  perPage: number = 50,
): Promise<UsersResponse> {
  const url = new URL('/api/admin/users', typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  url.searchParams.set('page', page.toString());
  url.searchParams.set('perPage', perPage.toString());

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-internal-admin-token': adminToken,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch users');
  }

  return response.json();
}
