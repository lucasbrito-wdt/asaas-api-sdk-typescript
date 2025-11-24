/**
 * DTO para atualização de configuração de antecipação
 */
export interface AnticipationConfigurationUpdateRequestDto {
  /** Define se a antecipação automática está habilitada para pagamentos com cartão de crédito */
  creditCardAutomaticEnabled?: boolean | null;
}

