/**
 * Parâmetros para listagem de recorrências PIX
 */
export interface ListRecurrencesParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por status da recorrência */
  status?: string | null;

  /** Filtro por valor da recorrência */
  value?: number | null;

  /** Filtro por nome do recebedor */
  searchText?: string | null;
}

