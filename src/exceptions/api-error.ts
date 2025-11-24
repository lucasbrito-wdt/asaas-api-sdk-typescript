import { AxiosResponse } from "axios";

/**
 * Classe base para erros da API.
 */
export class ApiError extends Error {
  public readonly status: number;
  public readonly response?: AxiosResponse;

  constructor(message: string, status: number, response?: AxiosResponse) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.response = response;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

