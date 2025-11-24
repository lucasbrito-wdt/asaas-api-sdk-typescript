/**
 * DTO para criação de assinatura
 */
export interface SubscriptionSaveRequestDto {
  /** Identificador único do cliente no Asaas */
  customer: string;

  /** Tipo de cobrança */
  billingType: string;

  /** Valor da assinatura */
  value: number;

  /** Data de vencimento do primeiro pagamento */
  nextDueDate: string;

  /** Frequência de cobrança */
  cycle: string;

  /** Informações de desconto */
  discount?: any | null;

  /** Informações de juros para pagamento após vencimento */
  interest?: any | null;

  /** Informações de multa para pagamento após vencimento */
  fine?: any | null;

  /** Descrição da assinatura (máx. 500 caracteres) */
  description?: string | null;

  /** Prazo limite para pagamentos serem gerados */
  endDate?: string | null;

  /** Número máximo de pagamentos a serem gerados para esta assinatura */
  maxPayments?: number | null;

  /** Identificador da assinatura no seu sistema */
  externalReference?: string | null;

  /** Informações de split */
  split?: any[] | null;

  /** Informações adicionais */
  [key: string]: any;
}

