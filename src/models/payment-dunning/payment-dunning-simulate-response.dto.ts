/**
 * DTO de resposta para simulação de cobrança de inadimplência
 */
export interface PaymentDunningSimulateResponseDto {
  /** Valor estimado */
  estimatedValue?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

