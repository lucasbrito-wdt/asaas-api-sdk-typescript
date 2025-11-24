/**
 * DTO para criação de conta a pagar
 */
export interface BillSaveRequestDto {
  /** Valor da conta */
  value: number;

  /** Data de vencimento */
  dueDate: string;

  /** Descrição */
  description?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

