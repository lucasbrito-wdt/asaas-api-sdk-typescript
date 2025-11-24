/**
 * Parâmetros para listagem de parcelas
 */
export interface ListInstallmentsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

