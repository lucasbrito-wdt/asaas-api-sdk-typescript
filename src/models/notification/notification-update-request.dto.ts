/**
 * DTO para atualização de notificação
 */
export interface NotificationUpdateRequestDto {
  /** Habilitar/desabilitar notificação */
  enabled?: boolean | null;

  /** Habilitar/desabilitar email enviado para você */
  emailEnabledForProvider?: boolean | null;

  /** Habilitar/desabilitar SMS enviado para você */
  smsEnabledForProvider?: boolean | null;

  /** Habilitar/desabilitar email enviado para o cliente */
  emailEnabledForCustomer?: boolean | null;

  /** Habilitar/desabilitar SMS enviado para o cliente */
  smsEnabledForCustomer?: boolean | null;

  /** Habilitar/desabilitar notificação por voz para o cliente */
  phoneCallEnabledForCustomer?: boolean | null;

  /** Habilitar/desabilitar mensagens WhatsApp para o cliente */
  whatsappEnabledForCustomer?: boolean | null;

  /** Especifica quantos dias antes da data de vencimento a notificação deve ser enviada */
  scheduleOffset?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

