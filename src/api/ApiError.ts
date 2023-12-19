export class ApiError<T> extends Error {
  details: T;
  status: number;

  constructor(message: string, status: number, details: T) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
