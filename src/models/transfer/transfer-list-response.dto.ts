import { TransferGetResponseDto } from "./transfer-get-response.dto";

/**
 * DTO de resposta para listagem de transferências
 */
export interface TransferListResponseDto {
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

  /** Lista de transferências */
  data?: TransferGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

