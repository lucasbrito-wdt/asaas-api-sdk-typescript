import { PaymentChargebackResponseDto } from "../payment/payment-chargeback-response.dto";

/**
 * DTO de resposta para listagem de estornos
 */
export interface ChargebackListResponseDto {
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

  /** Lista de estornos */
  data?: PaymentChargebackResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

