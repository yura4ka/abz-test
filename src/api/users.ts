import { ApiError } from "./ApiError";

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
  links: { next_url: string | null; prev_url: string | null };
  users: User[];
};

export function getUsers(page: number): Promise<UserResponse> {
  return fetch(`${BASE_URL}?page=${page}&count=6`).then((r) => r.json());
}

export type PostUserRequest = {
  name: string;
  email: string;
  phone: string;
  position_id: string;
  photo: File;
};

export type PostUserResponse =
  | {
      success: true;
      user_id: number;
      message: string;
    }
  | {
      success: false;
      message: string;
      fails?: {
        [k in keyof PostUserRequest]: string[];
      };
    };

export async function postUser({
  user,
  token,
}: {
  user: PostUserRequest;
  token: string;
}) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(user)) {
    formData.append(key, value);
  }

  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
    headers: { Token: token },
  });
  const result = (await response.json()) as PostUserResponse;

  if (!result.success)
    throw new ApiError(result.message, response.status, result);

  return result;
}
