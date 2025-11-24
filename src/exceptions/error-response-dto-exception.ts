import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "../models/error-response.dto";
import { ApiError } from "./api-error";

/**
 * Exceção para erros que retornam um ErrorResponseDto.
 */
export class ErrorResponseDtoException extends ApiError {
  public readonly errorModel: ErrorResponseDto;

  constructor(errorModel: ErrorResponseDto, message: string, status: number, response?: AxiosResponse) {
    super(message, status, response);
    this.name = "ErrorResponseDtoException";
    this.errorModel = errorModel;
    Object.setPrototypeOf(this, ErrorResponseDtoException.prototype);
  }
}

