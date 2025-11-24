/**
 * DTO de resposta para estatísticas de pagamento
 */
export interface FinanceGetPaymentStatisticsResponseDto {
  /** Número de cobranças */
  quantity?: number | null;

  /** Valor */
  value?: number | null;

  /** Valor líquido total */
  netValue?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

