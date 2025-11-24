/**
 * Parâmetros para listagem de transações PIX
 */
export interface ListTransactionsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por status da transação */
  status?: string | null;

  /** Filtro por tipo de transação */
  type?: string | null;

  /** Filtro por identificador da transação PIX no Banco Central */
  endToEndIdentifier?: string | null;
}

