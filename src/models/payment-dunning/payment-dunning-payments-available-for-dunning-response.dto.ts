/**
 * DTO de resposta para pagamentos disponíveis para cobrança
 */
export interface PaymentDunningPaymentsAvailableForDunningResponseDto {
  /** Lista de pagamentos */
  data?: any[];

  /** Total de itens */
  totalCount?: number;

  /** Informações adicionais */
  [key: string]: any;
}

