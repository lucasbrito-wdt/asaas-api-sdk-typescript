/**
 * DTO de resposta para criação de QR Code PIX
 */
export interface PixQrCodeSaveResponseDto {
  /** Identificador único do QR Code */
  id?: string;

  /** Chave PIX associada */
  addressKey?: string;

  /** Descrição */
  description?: string | null;

  /** Valor */
  value?: number | null;

  /** Código QR Code (em base64 ou string) */
  qrCode?: string | null;

  /** Código copia e cola */
  payload?: string | null;

  /** Data de criação */
  dateCreated?: string;

  /** Data de expiração */
  expirationDate?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

