/**
 * Parâmetros para recuperação de extrato
 */
export interface RetrieveExtractParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Data inicial da lista */
  startDate?: string | null;

  /** Data final da lista */
  finishDate?: string | null;

  /** Ordenação dos resultados */
  order?: string | null;
}

