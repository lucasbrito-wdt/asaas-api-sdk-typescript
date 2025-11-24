import { PixTransactionGetResponseDto } from "./pix-transaction-get-response.dto";

/**
 * DTO de resposta para listagem de transações PIX
 */
export interface PixTransactionListResponseDto {
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

  /** Lista de transações */
  data?: PixTransactionGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

