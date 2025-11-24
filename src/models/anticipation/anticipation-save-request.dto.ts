/**
 * DTO para criação de antecipação
 */
export interface AnticipationSaveRequestDto {
  /** ID da parcela a ser antecipada */
  installment?: string | null;

  /** ID do pagamento a ser antecipado */
  payment?: string | null;

  /** Arquivo (documentos) */
  documents?: Buffer | ArrayBuffer | Uint8Array | null;

  /** Informações adicionais */
  [key: string]: any;
}

