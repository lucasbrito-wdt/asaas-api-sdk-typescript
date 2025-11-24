/**
 * Parâmetros para listagem de chaves PIX
 */
export interface ListKeysParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por status atual da chave */
  status?: string | null;

  /** Filtro por um ou mais status de chave */
  statusList?: string | null;
}

