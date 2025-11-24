/**
 * DTO de requisição para reembolso de pagamento
 */
export interface PaymentRefundRequestDto {
  /** Valor do reembolso (opcional, se não informado reembolsa o valor total) */
  value?: number | null;

  /** Motivo do reembolso */
  description?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

