import { ErrorResponseItemDto } from "./error-response-item.dto";

/**
 * DTO de resposta de erro padrão da API
 */
export interface ErrorResponseDto {
  errors?: ErrorResponseItemDto[];
}

/**
 * Classe wrapper para ErrorResponseDto usado no mapeamento de erros
 */
export class ErrorResponseDtoClass implements ErrorResponseDto {
  errors?: ErrorResponseItemDto[];

  constructor(data?: ErrorResponseDto) {
    if (data) {
      this.errors = data.errors;
    }
  }
}

