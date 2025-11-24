/**
 * DTO de resposta para obtenção de notificação
 */
export interface NotificationGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único da notificação */
  id?: string | null;

  /** Identificador único do cliente */
  customer?: string | null;

  /** Indica se a notificação está habilitada */
  enabled?: boolean | null;

  /** Indica se o email enviado para você está habilitado ou desabilitado */
  emailEnabledForProvider?: boolean | null;

  /** Indica se o SMS enviado para você está habilitado ou desabilitado */
  smsEnabledForProvider?: boolean | null;

  /** Indica se o email enviado para o cliente está habilitado ou desabilitado */
  emailEnabledForCustomer?: boolean | null;

  /** Indica se o SMS enviado para o cliente está habilitado ou desabilitado */
  smsEnabledForCustomer?: boolean | null;

  /** Indica se a notificação por voz para o cliente está habilitada ou desabilitada */
  phoneCallEnabledForCustomer?: boolean | null;

  /** Indica se a notificação WhatsApp enviada para o cliente está habilitada ou desabilitada */
  whatsappEnabledForCustomer?: boolean | null;

  /** Tipo de evento */
  event?: string | null;

  /** Especifica quantos dias antes da data de vencimento a notificação deve ser enviada */
  scheduleOffset?: string | null;

  /** Indica se a notificação foi deletada */
  deleted?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

