import { PaymentSplitGetResponseDto } from "./payment-split-get-response.dto";

/**
 * DTO de resposta para listagem de splits de pagamento
 */
export interface PaymentSplitListResponseDto {
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

  /** Lista de splits */
  data?: PaymentSplitGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

