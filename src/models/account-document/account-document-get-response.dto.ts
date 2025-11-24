/**
 * DTO de resposta para obtenção de documento da conta
 */
export interface AccountDocumentGetResponseDto {
  /** Identificador único do documento */
  id?: string | null;

  /** Tipo do documento */
  type?: string | null;

  /** Status do documento */
  status?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

