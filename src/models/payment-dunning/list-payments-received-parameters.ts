/**
 * Parâmetros para listagem de pagamentos recebidos
 */
export interface ListPaymentsReceivedParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

