import { PaymentLeanGetResponseDto } from "./payment-lean-get-response.dto";

/**
 * DTO de resposta para listagem de pagamentos com dados resumidos
 */
export interface PaymentLeanListResponseDto {
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
  data?: PaymentLeanGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

