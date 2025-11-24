import { PaymentLinkGetResponseDto } from "./payment-link-get-response.dto";

/**
 * DTO de resposta para listagem de links de pagamento
 */
export interface PaymentLinkListResponseDto {
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

  /** Lista de links */
  data?: PaymentLinkGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

