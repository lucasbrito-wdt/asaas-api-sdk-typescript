/**
 * DTO de resposta para obtenção de item de recorrência PIX
 */
export interface PixRecurringTransactionGetItemResponseDto {
  /** Identificador único do item de recorrência no Asaas */
  id?: string | null;

  /** Status do item de recorrência */
  status?: string | null;

  /** Data agendada do item de recorrência */
  scheduledDate?: string | null;

  /** Se o item pode ser cancelado */
  canBeCancelled?: boolean | null;

  /** Número da recorrência */
  recurrenceNumber?: number | null;

  /** Número de repetições */
  quantity?: number | null;

  /** Valor da recorrência */
  value?: number | null;

  /** Descrição do motivo da recusa */
  refusalReasonDescription?: string | null;

  /** Informações do recebedor */
  externalAccount?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

