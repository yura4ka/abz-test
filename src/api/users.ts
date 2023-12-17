const BASE_URL = import.meta.env.VITE_API_URL + "users/";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
};

export type UserResponse = {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: { next_url: string; prev_url: string | null };
  users: User[];
};

export function getUsers(page: number): Promise<UserResponse> {
  return fetch(`${BASE_URL}?page=${page}&count=6`).then((r) => r.json());
}
