/**
 * DTO de resposta para listagem de pagamentos parciais
 */
export interface PaymentDunningListPartialPaymentsResponseDto {
  /** Lista de pagamentos parciais */
  data?: any[];

  /** Total de itens */
  totalCount?: number;

  /** Informações adicionais */
  [key: string]: any;
}

