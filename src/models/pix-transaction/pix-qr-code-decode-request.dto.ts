/**
 * DTO para decodificação de QR Code PIX
 */
export interface PixQrCodeDecodeRequestDto {
  /** Payload do QR Code */
  payload: string;

  /** Valor do troco (para QR Code de Troco) */
  changeValue?: number | null;
}

