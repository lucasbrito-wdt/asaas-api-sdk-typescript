/**
 * Parâmetros para listagem de recargas de celular
 */
export interface ListMobileRechargesParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

