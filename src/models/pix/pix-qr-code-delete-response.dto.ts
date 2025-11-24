/**
 * DTO de resposta para exclusão de QR Code PIX
 */
export interface PixQrCodeDeleteResponseDto {
  /** Indica se a exclusão foi bem-sucedida */
  deleted?: boolean;

  /** Mensagem de resposta */
  message?: string;

  /** Informações adicionais */
  [key: string]: any;
}

