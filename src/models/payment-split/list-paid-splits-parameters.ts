/**
 * Parâmetros para listagem de splits pagos
 */
export interface ListPaidSplitsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por ID do pagamento */
  paymentId?: string | null;

  /** Filtro por status */
  status?: string | null;

  /** Filtro por data de confirmação do pagamento (inicial) */
  paymentConfirmedDateGe?: string | null;

  /** Filtro por data de confirmação do pagamento (final) */
  paymentConfirmedDateLe?: string | null;

  /** Filtro por data de crédito (inicial) */
  creditDateGe?: string | null;

  /** Filtro por data de crédito (final) */
  creditDateLe?: string | null;
}

