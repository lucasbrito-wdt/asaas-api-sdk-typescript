/**
 * DTO para criação de link de pagamento
 */
export interface PaymentLinkSaveRequestDto {
  /** Nome do link de pagamento */
  name: string;

  /** Método de pagamento permitido */
  billingType: string;

  /** Tipo de cobrança */
  chargeType: string;

  /** Descrição do link */
  description?: string | null;

  /** Data de término */
  endDate?: string | null;

  /** Valor do link (se não informado, o pagador pode informar) */
  value?: number | null;

  /** Número de dias úteis para pagamento após geração da fatura */
  dueDateLimitDays?: number | null;

  /** Frequência de cobrança (se chargeType é RECURRENT) */
  subscriptionCycle?: string | null;

  /** Número máximo de parcelas */
  maxInstallmentCount?: number | null;

  /** Campo de busca livre */
  externalReference?: string | null;

  /** Define se notificações estarão habilitadas */
  notificationEnabled?: boolean | null;

  /** Informações de redirecionamento automático */
  callback?: any | null;

  /** true para tornar obrigatório preencher dados de endereço */
  isAddressRequired?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

