/**
 * Parâmetros para estatísticas de cobrança
 */
export interface BillingStatisticsParameters {
  /** Filtro por identificador único do cliente */
  customer?: string | null;

  /** Filtro por método de pagamento */
  billingType?: string | null;

  /** Filtro por status */
  status?: string | null;

  /** Filtro por antecipações ou não */
  anticipated?: boolean | null;

  /** Filtro por data de criação inicial */
  dateCreatedGe?: string | null;

  /** Filtro por data de criação final */
  dateCreatedLe?: string | null;

  /** Filtro por data de vencimento inicial */
  dueDateGe?: string | null;

  /** Filtro por data de vencimento final */
  dueDateLe?: string | null;

  /** Filtro por data estimada de crédito inicial */
  estimatedCreditDateGe?: string | null;

  /** Filtro por data estimada de crédito final */
  estimatedCreditDateLe?: string | null;

  /** Filtro por identificador do seu sistema */
  externalReference?: string | null;
}

