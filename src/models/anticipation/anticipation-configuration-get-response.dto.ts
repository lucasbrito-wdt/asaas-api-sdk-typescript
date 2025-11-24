/**
 * DTO de resposta para obtenção de configuração de antecipação
 */
export interface AnticipationConfigurationGetResponseDto {
  /** Indica se a antecipação automática está habilitada para pagamentos com cartão de crédito */
  creditCardAutomaticEnabled?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

