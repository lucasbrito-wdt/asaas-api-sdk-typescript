import { PaymentGetResponseDto } from "./payment-get-response.dto";

/**
 * DTO de resposta para listagem de pagamentos
 */
export interface PaymentListResponseDto {
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

  /** Lista de pagamentos */
  data?: PaymentGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

