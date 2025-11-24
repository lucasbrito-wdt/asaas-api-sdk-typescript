import { PaymentDunningShowResponseDto } from "./payment-dunning-show-response.dto";

/**
 * DTO de resposta para listagem de cobranças de inadimplência
 */
export interface PaymentDunningListResponseDto {
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

  /** Lista de cobranças */
  data?: PaymentDunningShowResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

