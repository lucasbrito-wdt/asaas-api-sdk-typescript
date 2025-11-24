/**
 * DTO de resposta para obtenção de transação financeira
 */
export interface FinancialTransactionGetResponseDto {
  /** Identificador único da transação */
  id?: string | null;

  /** Tipo da transação */
  type?: string | null;

  /** Data da transação */
  date?: string | null;

  /** Valor */
  value?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

