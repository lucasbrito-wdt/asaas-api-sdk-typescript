/**
 * Parâmetros para listagem de pagamentos disponíveis para cobrança
 */
export interface ListPaymentsAvailableForPaymentDunningParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

