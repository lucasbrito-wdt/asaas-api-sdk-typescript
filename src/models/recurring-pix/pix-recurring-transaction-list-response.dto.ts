import { PixRecurringTransactionGetResponseDto } from "./pix-recurring-transaction-get-response.dto";

/**
 * DTO de resposta para listagem de recorrências PIX
 */
export interface PixRecurringTransactionListResponseDto {
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

  /** Lista de recorrências */
  data?: PixRecurringTransactionGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

