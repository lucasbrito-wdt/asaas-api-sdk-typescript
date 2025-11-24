/**
 * Parâmetros para listagem de transferências
 */
export interface ListTransfersParameters {
  /** Filtro por data de criação inicial */
  dateCreatedLeGe?: string | null;

  /** Filtro por data de criação final */
  dateCreatedLeLe?: string | null;

  /** Filtro por data efetiva de transferência inicial */
  transferDateGe?: string | null;

  /** Filtro por data efetiva de transferência final */
  transferDateLe?: string | null;

  /** Filtro por tipo de transferência */
  type?: string | null;
}

