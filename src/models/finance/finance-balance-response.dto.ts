/**
 * DTO de resposta para saldo da conta
 */
export interface FinanceBalanceResponseDto {
  /** Saldo da conta */
  balance?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

