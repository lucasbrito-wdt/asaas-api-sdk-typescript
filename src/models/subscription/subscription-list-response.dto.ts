import { SubscriptionGetResponseDto } from "./subscription-get-response.dto";

/**
 * DTO de resposta para listagem de assinaturas
 */
export interface SubscriptionListResponseDto {
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

  /** Lista de assinaturas */
  data?: SubscriptionGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

