/**
 * DTO de resposta para estatísticas de splits
 */
export interface FinanceGetSplitStatisticsResponseDto {
  /** Valores a receber */
  income?: number | null;

  /** Valores a serem enviados */
  value?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

