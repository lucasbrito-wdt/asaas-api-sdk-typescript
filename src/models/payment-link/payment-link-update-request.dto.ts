/**
 * DTO para atualização de link de pagamento
 */
export interface PaymentLinkUpdateRequestDto {
  /** Nome do link */
  name?: string | null;

  /** Descrição */
  description?: string | null;

  /** Data de término */
  endDate?: string | null;

  /** Valor do link */
  value?: number | null;

  /** Se está ativo */
  active?: boolean | null;

  /** Método de pagamento permitido */
  billingType?: string | null;

  /** Tipo de cobrança */
  chargeType?: string | null;

  /** Número de dias úteis */
  dueDateLimitDays?: number | null;

  /** Frequência de cobrança */
  subscriptionCycle?: string | null;

  /** Número máximo de parcelas */
  maxInstallmentCount?: number | null;

  /** Referência externa */
  externalReference?: string | null;

  /** Notificações habilitadas */
  notificationEnabled?: boolean | null;

  /** Callback */
  callback?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

