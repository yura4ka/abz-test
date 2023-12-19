const BASE_URL = import.meta.env.VITE_API_URL + "positions/";

export type Position = {
  id: number;
  name: string;
};

export type PositionResponse = {
  success: boolean;
  positions: Position[];
};

export function getPositions(): Promise<PositionResponse> {
  return fetch(BASE_URL).then((r) => r.json());
}
