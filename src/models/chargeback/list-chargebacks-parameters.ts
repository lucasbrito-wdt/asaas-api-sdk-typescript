/**
 * Parâmetros para listagem de estornos
 */
export interface ListChargebacksParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

