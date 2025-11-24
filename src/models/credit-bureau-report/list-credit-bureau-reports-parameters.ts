/**
 * Parâmetros para listagem de relatórios de crédito
 */
export interface ListCreditBureauReportsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Data inicial */
  startDate?: string | null;

  /** Data final */
  endDate?: string | null;
}

