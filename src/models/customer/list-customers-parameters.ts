/**
 * Parâmetros para listagem de clientes
 */
export interface ListCustomersParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por nome */
  name?: string | null;

  /** Filtro por email */
  email?: string | null;

  /** Filtro por CPF ou CNPJ */
  cpfCnpj?: string | null;

  /** Filtro por grupo */
  groupName?: string | null;

  /** Filtro por identificador do seu sistema */
  externalReference?: string | null;
}

