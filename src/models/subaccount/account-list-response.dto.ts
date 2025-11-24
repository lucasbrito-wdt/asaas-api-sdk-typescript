import { AccountGetResponseDto } from "./account-get-response.dto";

/**
 * DTO de resposta para listagem de subcontas
 */
export interface AccountListResponseDto {
  /** Tipo do objeto */
  object?: string;

  /** Indica se há mais páginas */
  hasMore?: boolean;

  /** Total de itens */
  totalCount?: number;

  /** Limite de itens por página */
  limit?: number;

  /** Offset da página */
  offset?: number;

  /** Lista de subcontas */
  data?: AccountGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

