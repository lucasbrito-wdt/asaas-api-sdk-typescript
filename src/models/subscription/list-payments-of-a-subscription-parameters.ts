/**
 * Parâmetros para listagem de pagamentos de uma assinatura
 */
export interface ListPaymentsOfASubscriptionParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

