import { InvoiceGetResponseDto } from "./invoice-get-response.dto";

/**
 * DTO de resposta para listagem de faturas
 */
export interface InvoiceListResponseDto {
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

  /** Lista de faturas */
  data?: InvoiceGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

