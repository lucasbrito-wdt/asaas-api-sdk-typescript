/**
 * DTO de resposta para reembolso de boleto
 */
export interface PaymentBankSlipRefundResponseDto {
  /** Link para relatório de detalhes do reembolso */
  requestUrl?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

