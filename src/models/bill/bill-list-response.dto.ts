import { BillGetResponseDto } from "./bill-get-response.dto";

/**
 * DTO de resposta para listagem de contas a pagar
 */
export interface BillListResponseDto {
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

  /** Lista de contas */
  data?: BillGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

