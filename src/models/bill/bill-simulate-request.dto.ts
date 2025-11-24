/**
 * DTO para simulação de conta a pagar
 */
export interface BillSimulateRequestDto {
  /** Valor da conta */
  value: number;

  /** Data de vencimento */
  dueDate: string;

  /** Informações adicionais */
  [key: string]: any;
}

