/**
 * DTO para criação de documento de pagamento
 */
export interface PaymentDocumentSaveRequestDto {
  /** true para disponibilizar o arquivo apenas após recebimento do pagamento */
  availableAfterPayment: boolean;

  /** Tipo do documento */
  type: PaymentDocumentType;

  /** Arquivo (Buffer ou ArrayBuffer) */
  file: Buffer | ArrayBuffer | Uint8Array;
}

/**
 * Tipo de documento de pagamento
 */
export enum PaymentDocumentType {
  INVOICE = "INVOICE",
  CONTRACT = "CONTRACT",
  MEDIA = "MEDIA",
  DOCUMENT = "DOCUMENT",
  SPREADSHEET = "SPREADSHEET",
  PROGRAM = "PROGRAM",
  OTHER = "OTHER",
}

