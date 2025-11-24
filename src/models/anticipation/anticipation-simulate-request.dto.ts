/**
 * DTO para simulação de antecipação
 */
export interface AnticipationSimulateRequestDto {
  /** ID da parcela a ser antecipada */
  installment?: string | null;

  /** ID do pagamento a ser antecipado */
  payment?: string | null;
}

