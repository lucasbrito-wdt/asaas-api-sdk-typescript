/**
 * DTO para atualização de assinatura
 */
export interface SubscriptionUpdateRequestDto {
  /** Valor da assinatura */
  value?: number | null;

  /** Data de vencimento do próximo pagamento */
  nextDueDate?: string | null;

  /** Descrição */
  description?: string | null;

  /** Prazo limite */
  endDate?: string | null;

  /** Número máximo de pagamentos */
  maxPayments?: number | null;

  /** Referência externa */
  externalReference?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

