/**
 * DTO de resposta para obtenção de conta a pagar
 */
export interface BillGetResponseDto {
  /** Identificador único da conta */
  id?: string | null;

  /** Valor da conta */
  value?: number | null;

  /** Data de vencimento */
  dueDate?: string | null;

  /** Status */
  status?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

