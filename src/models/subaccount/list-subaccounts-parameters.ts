/**
 * Parâmetros para listagem de subcontas
 */
export interface ListSubaccountsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por CPF ou CNPJ da subconta */
  cpfCnpj?: string | null;

  /** Filtro por email da subconta */
  email?: string | null;

  /** Filtro por nome da subconta */
  name?: string | null;

  /** Filtro por walletId da subconta */
  walletId?: string | null;
}

