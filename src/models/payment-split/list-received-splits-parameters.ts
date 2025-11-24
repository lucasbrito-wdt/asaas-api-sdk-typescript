/**
 * Parâmetros para listagem de splits recebidos
 */
export interface ListReceivedSplitsParameters {
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

  /** Filtro por data de recebimento do split (inicial) */
  creditDateGe?: string | null;

  /** Filtro por data de recebimento do split (final) */
  creditDateLe?: string | null;
}

