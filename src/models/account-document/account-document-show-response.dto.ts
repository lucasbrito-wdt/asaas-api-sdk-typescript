/**
 * DTO de resposta para verificação de documentos pendentes
 */
export interface AccountDocumentShowResponseDto {
  /** Lista de documentos pendentes */
  pendingDocuments?: any[] | null;

  /** Informações adicionais */
  [key: string]: any;
}

