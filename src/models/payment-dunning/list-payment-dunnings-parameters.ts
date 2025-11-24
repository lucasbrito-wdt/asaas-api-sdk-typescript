/**
 * Parâmetros para listagem de cobranças de inadimplência
 */
export interface ListPaymentDunningsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por status da cobrança */
  status?: string | null;

  /** Filtro por tipo de cobrança */
  type?: string | null;

  /** Filtro por pagamento específico */
  payment?: string | null;

  /** Filtro por data inicial da requisição */
  requestStartDate?: string | null;

  /** Filtro por data final da requisição */
  requestEndDate?: string | null;
}

