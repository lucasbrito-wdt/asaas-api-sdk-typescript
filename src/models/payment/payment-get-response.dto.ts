/**
 * DTO de resposta para obtenção de pagamento
 */
export interface PaymentGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único do pagamento no Asaas */
  id?: string | null;

  /** Data de criação do pagamento */
  dateCreated?: string | null;

  /** Identificador único do cliente */
  customer?: string | null;

  /** Identificador único da assinatura (quando cobrança recorrente) */
  subscription?: string | null;

  /** Identificador único da parcela (quando cobrança parcelada) */
  installment?: string | null;

  /** Identificador único do checkout */
  checkoutSession?: string | null;

  /** Identificador único do link de pagamento */
  paymentLink?: string | null;

  /** Valor do pagamento */
  value?: number | null;

  /** Valor líquido da cobrança após descontar a taxa Asaas */
  netValue?: number | null;

  /** Valor original da cobrança */
  originalValue?: number | null;

  /** Valor calculado de juros e multa */
  interestValue?: number | null;

  /** Descrição do pagamento */
  description?: string | null;

  /** Data de vencimento */
  dueDate?: string | null;

  /** Data de pagamento */
  paymentDate?: string | null;

  /** Data estimada de crédito */
  estimatedCreditDate?: string | null;

  /** Status do pagamento */
  status?: string | null;

  /** Tipo de cobrança */
  billingType?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

