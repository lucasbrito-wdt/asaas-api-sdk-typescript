/**
 * DTO de resposta para obtenção de assinatura
 */
export interface SubscriptionGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único da assinatura no Asaas */
  id?: string | null;

  /** Data de criação da assinatura */
  dateCreated?: string | null;

  /** Identificador único do cliente */
  customer?: string | null;

  /** Identificador único do link de pagamentos */
  paymentLink?: string | null;

  /** Tipo de cobrança */
  billingType?: string | null;

  /** Frequência de cobrança */
  cycle?: string | null;

  /** Valor da assinatura */
  value?: number | null;

  /** Data de vencimento do próximo pagamento a ser gerado */
  nextDueDate?: string | null;

  /** Prazo limite para pagamentos serem gerados */
  endDate?: string | null;

  /** Descrição da assinatura */
  description?: string | null;

  /** Status da assinatura */
  status?: string | null;

  /** Informações de desconto */
  discount?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

