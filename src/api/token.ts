const BASE_URL = import.meta.env.VITE_API_URL + "token/";

export type TokenResponse = {
  success: boolean;
  token: string;
};

export function getToken(): Promise<TokenResponse> {
  return fetch(BASE_URL).then((r) => r.json());
}
