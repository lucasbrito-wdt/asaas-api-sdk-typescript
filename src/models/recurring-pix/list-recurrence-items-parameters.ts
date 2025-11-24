/**
 * Parâmetros para listagem de itens de recorrência PIX
 */
export interface ListRecurrenceItemsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

