/**
 * DTO de resposta para obtenção de pagamento com dados resumidos
 */
export interface PaymentLeanGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único do pagamento no Asaas */
  id?: string | null;

  /** Data de criação do pagamento */
  dateCreated?: string | null;

  /** Identificador único do cliente */
  customerId?: string | null;

  /** Identificador único da assinatura */
  subscriptionId?: string | null;

  /** Identificador único da parcela */
  installmentId?: string | null;

  /** Identificador único do link de pagamento */
  paymentLinkId?: string | null;

  /** Valor do pagamento */
  value?: number | null;

  /** Valor líquido após descontar taxa Asaas */
  netValue?: number | null;

  /** Valor original */
  originalValue?: number | null;

  /** Valor de juros */
  interestValue?: number | null;

  /** Descrição */
  description?: string | null;

  /** Tipo de cobrança */
  billingType?: string | null;

  /** Status */
  status?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

