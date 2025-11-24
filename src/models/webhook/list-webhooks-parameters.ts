/**
 * Parâmetros para listagem de webhooks
 */
export interface ListWebhooksParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

