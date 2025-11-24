/**
 * Parâmetros para listagem de códigos NBS
 */
export interface ListNbsCodesParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

