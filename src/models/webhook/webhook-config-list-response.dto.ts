import { WebhookConfigGetResponseDto } from "./webhook-config-get-response.dto";

/**
 * DTO de resposta para listagem de configurações de webhook
 */
export interface WebhookConfigListResponseDto {
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

  /** Lista de webhooks */
  data?: WebhookConfigGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

