/**
 * DTO para criação de transação PIX
 */
export interface PixTransactionSaveRequestDto {
  /** Payload do QR Code para pagamento */
  qrCode: any; // PixTransactionQrCodeSaveRequestDto

  /** Valor a ser pago */
  value: number;

  /** Descrição do pagamento */
  description?: string | null;

  /** Usado para agendar pagamento */
  scheduleDate?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

