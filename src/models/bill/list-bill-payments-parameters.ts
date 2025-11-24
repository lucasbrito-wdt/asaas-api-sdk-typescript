/**
 * Parâmetros para listagem de contas a pagar
 */
export interface ListBillPaymentsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

