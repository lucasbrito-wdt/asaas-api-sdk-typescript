/**
 * DTO para envio de documentos de cobrança
 */
export interface PaymentDunningSaveDocumentsRequestDto {
  /** Documentos (arquivo) */
  documents: Buffer | ArrayBuffer | Uint8Array;
}

