/**
 * DTO de resposta para listagem de histórico de cobrança
 */
export interface PaymentDunningListHistoryResponseDto {
  /** Lista de eventos */
  data?: any[];

  /** Total de itens */
  totalCount?: number;

  /** Informações adicionais */
  [key: string]: any;
}

