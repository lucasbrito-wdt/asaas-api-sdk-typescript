/**
 * Parâmetros para listagem de antecipações
 */
export interface ListAnticipationsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por antecipações de um pagamento */
  payment?: string | null;

  /** Filtro por antecipações de uma parcela */
  installment?: string | null;

  /** Filtro por status */
  status?: string | null;
}

