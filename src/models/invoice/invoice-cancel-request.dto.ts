/**
 * DTO para cancelamento de fatura
 */
export interface InvoiceCancelRequestDto {
  /** Motivo do cancelamento */
  reason?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

