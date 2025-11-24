/**
 * DTO de resposta para obtenção de reembolso de pagamento
 */
export interface PaymentRefundGetResponseDto {
  /** Data de criação do reembolso */
  dateCreated?: string | null;

  /** Status do reembolso */
  status?: string | null;

  /** Valor do reembolso */
  value?: number | null;

  /** (Pix apenas) Identificador único da transação Pix no Banco Central */
  endToEndIdentifier?: string | null;

  /** Descrição do reembolso */
  description?: string | null;

  /** (Pix apenas) Data efetiva do reembolso */
  effectiveDate?: string | null;

  /** Link do comprovante da transação */
  transactionReceiptUrl?: string | null;

  /** Splits reembolsados, se houver */
  refundedSplits?: any[] | null;

  /** Informações adicionais */
  [key: string]: any;
}

