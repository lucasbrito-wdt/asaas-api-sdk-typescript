/**
 * Parâmetros para listagem de links de pagamento
 */
export interface ListPaymentsLinksParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por link ativo ou desativado */
  active?: boolean | null;

  /** true para também recuperar links removidos */
  includeDeleted?: boolean | null;

  /** Filtro por nome do link */
  name?: string | null;

  /** Filtro por identificador do seu sistema */
  externalReference?: string | null;
}

