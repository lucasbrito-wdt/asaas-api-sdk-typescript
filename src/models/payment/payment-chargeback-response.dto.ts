/**
 * DTO de resposta para estorno de pagamento
 */
export interface PaymentChargebackResponseDto {
  /** Identificador único do estorno */
  id?: string | null;

  /** Status do estorno */
  status?: string | null;

  /** Valor do estorno */
  value?: number | null;

  /** Data do estorno */
  date?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

