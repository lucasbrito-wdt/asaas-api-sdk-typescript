/**
 * Parâmetros para listagem de pagamentos com dados resumidos
 */
export interface ListPaymentsWithSummaryDataParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por identificador único do cliente */
  customer?: string | null;

  /** Filtro por nome do grupo de clientes */
  customerGroupName?: string | null;

  /** Filtro por tipo de cobrança */
  billingType?: string | null;

  /** Filtro por status */
  status?: string | null;

  /** Filtro por identificador único de assinatura */
  subscription?: string | null;

  /** Filtro por identificador único de parcela */
  installment?: string | null;

  /** Filtro por identificador do seu sistema */
  externalReference?: string | null;

  /** Filtro por data de pagamento */
  paymentDate?: string | null;

  /** Filtro para retornar cobranças que têm ou não têm fatura */
  invoiceStatus?: string | null;

  /** Filtro por data estimada de crédito */
  estimatedCreditDate?: string | null;

  /** Filtro por ID do QR Code PIX estático */
  pixQrCodeId?: string | null;

  /** Filtro por antecipado */
  anticipated?: boolean | null;

  /** Filtro por antecipável */
  anticipable?: boolean | null;

  /** Filtro por data de criação (maior ou igual) */
  dateCreatedGe?: string | null;

  /** Filtro por data de criação (menor ou igual) */
  dateCreatedLe?: string | null;

  /** Filtro por data de pagamento (maior ou igual) */
  paymentDateGe?: string | null;

  /** Filtro por data de pagamento (menor ou igual) */
  paymentDateLe?: string | null;

  /** Filtro por data estimada de crédito (maior ou igual) */
  estimatedCreditDateGe?: string | null;

  /** Filtro por data estimada de crédito (menor ou igual) */
  estimatedCreditDateLe?: string | null;

  /** Filtro por data de vencimento (maior ou igual) */
  dueDateGe?: string | null;

  /** Filtro por data de vencimento (menor ou igual) */
  dueDateLe?: string | null;

  /** Filtro por usuário */
  user?: string | null;
}

