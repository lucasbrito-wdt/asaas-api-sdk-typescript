/**
 * DTO de resposta para cancelamento de cobrança de inadimplência
 */
export interface PaymentDunningCancelResponseDto {
  /** Status após cancelamento */
  status?: string | null;

  /** Tipo da cobrança */
  type?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

