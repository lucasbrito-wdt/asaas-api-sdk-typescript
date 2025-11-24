/**
 * DTO para envio de documentos da conta
 */
export interface AccountDocumentSaveRequestDto {
  /** Tipo do documento */
  type?: string | null;

  /** Arquivo do documento (Buffer, ArrayBuffer ou Uint8Array) */
  documentFile?: Buffer | ArrayBuffer | Uint8Array | null;

  /** Informações adicionais */
  [key: string]: any;
}

