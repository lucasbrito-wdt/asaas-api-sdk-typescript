/**
 * DTO de resposta para obtenção de recorrência PIX
 */
export interface PixRecurringTransactionGetResponseDto {
  /** Identificador único da recorrência no Asaas */
  id?: string | null;

  /** Status da recorrência */
  status?: string | null;

  /** Indica a origem da recorrência */
  origin?: string | null;

  /** Valor da recorrência */
  value?: number | null;

  /** Frequência da recorrência */
  frequency?: string | null;

  /** Número de repetições */
  quantity?: number | null;

  /** Data de início da recorrência */
  startDate?: string | null;

  /** Data de término da recorrência */
  finishDate?: string | null;

  /** Se a recorrência pode ser cancelada */
  canBeCancelled?: boolean | null;

  /** Informações do recebedor */
  externalAccount?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

