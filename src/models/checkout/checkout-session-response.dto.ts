/**
 * DTO de resposta para sessão de checkout
 */
export interface CheckoutSessionResponseDto {
  /** Métodos de pagamento */
  billingTypes?: string[] | null;

  /** Tipos de cobrança */
  chargeTypes?: string[] | null;

  /** Tempo em minutos para expiração do checkout */
  minutesToExpire?: number | null;

  /** Informações de redirecionamento automático após pagamento */
  callback?: any | null;

  /** Lista de itens no checkout */
  items?: any[] | null;

  /** Dados do cliente */
  customerData?: any | null;

  /** Detalhes da assinatura */
  subscription?: any | null;

  /** Detalhes da parcela */
  installment?: any | null;

  /** Configurações de split */
  split?: any[] | null;

  /** Identificador único do checkout */
  id?: string | null;

  /** URL do checkout */
  url?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

