import { NotificationGetResponseDto } from "./notification-get-response.dto";

/**
 * DTO de resposta para atualização em lote de notificações
 */
export interface NotificationBatchUpdateResponseDto {
  /** Lista de informações de notificação */
  notifications?: NotificationGetResponseDto[] | null;

  /** Informações adicionais */
  [key: string]: any;
}

