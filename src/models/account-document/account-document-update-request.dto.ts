/**
 * DTO para atualização de documento da conta
 */
export interface AccountDocumentUpdateRequestDto {
  /** Tipo do documento */
  type?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

