/**
 * Parâmetros para listagem de faturas
 */
export interface ListInvoicesParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por data de emissão inicial */
  effectiveDateGe?: string | null;

  /** Filtro por data de emissão final */
  effectiveDateLe?: string | null;

  /** Filtro por identificador único do pagamento */
  payment?: string | null;

  /** Filtro por identificador único da parcela */
  installment?: string | null;

  /** Filtro por identificador da fatura no seu sistema */
  externalReference?: string | null;

  /** Filtro por situação */
  status?: string | null;

  /** Filtro por identificador único do cliente */
  customer?: string | null;
}

