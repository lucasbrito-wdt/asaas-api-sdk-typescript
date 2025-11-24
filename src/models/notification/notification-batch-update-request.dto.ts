import { NotificationUpdateRequestDto } from "./notification-update-request.dto";

/**
 * DTO para atualização em lote de notificações
 */
export interface NotificationBatchUpdateRequestDto {
  /** Identificador único do cliente no Asaas */
  customer: string;

  /** Lista de informações de notificação */
  notifications?: NotificationUpdateRequestDto[] | null;
}

