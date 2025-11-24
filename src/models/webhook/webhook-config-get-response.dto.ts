/**
 * DTO de resposta para obtenção de configuração de webhook
 */
export interface WebhookConfigGetResponseDto {
  /** Identificador único do webhook */
  id?: string | null;

  /** Nome do webhook */
  name?: string | null;

  /** URL do webhook */
  url?: string | null;

  /** Email que receberá notificações sobre o webhook */
  email?: string | null;

  /** Define se o webhook está ativo */
  enabled?: boolean | null;

  /** Define se a fila de sincronização está parada */
  interrupted?: boolean | null;

  /** Versão da API */
  apiVersion?: number | null;

  /** Indica se há token de autenticação registrado para o webhook */
  hasAuthToken?: boolean | null;

  /** Sequencial (SEQUENTIALLY) ou não sequencial (NON_SEQUENTIALLY) */
  sendType?: string | null;

  /** Lista de eventos que este webhook observa */
  events?: string[] | null;

  /** Informações adicionais */
  [key: string]: any;
}

