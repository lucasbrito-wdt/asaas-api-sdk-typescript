import { PaymentRefundGetResponseDto } from "./payment-refund-get-response.dto";

/**
 * DTO de resposta para listagem de reembolsos de pagamento
 */
export interface PaymentRefundListResponseDto {
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

  /** Lista de reembolsos */
  data?: PaymentRefundGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

