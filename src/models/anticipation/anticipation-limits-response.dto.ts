/**
 * DTO de resposta para limites de antecipação
 */
export interface AnticipationLimitsResponseDto {
  /** Limites de antecipação de cartão de crédito */
  creditCard?: any | null;

  /** Limites de antecipação de boleto bancário */
  bankSlip?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

