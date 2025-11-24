/**
 * DTO para criação de sessão de checkout
 */
export interface CheckoutSessionSaveRequestDto {
  /** Métodos de pagamento */
  billingTypes: string[];

  /** Tipos de cobrança */
  chargeTypes: string[];

  /** Informações de redirecionamento automático após pagamento */
  callback?: any | null;

  /** Lista de itens no checkout */
  items: any[];

  /** Tempo em minutos para expiração do checkout */
  minutesToExpire?: number | null;

  /** Dados do cliente */
  customerData?: any | null;

  /** Detalhes da assinatura */
  subscription?: any | null;

  /** Detalhes da parcela */
  installment?: any | null;

  /** Configurações de split */
  splits?: any[] | null;

  /** Informações adicionais */
  [key: string]: any;
}

