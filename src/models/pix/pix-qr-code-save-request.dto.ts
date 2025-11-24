/**
 * DTO para criação de QR Code PIX estático
 */
export interface PixQrCodeSaveRequestDto {
  /** Identificador da chave PIX */
  addressKey?: string | null;

  /** Descrição do QR Code */
  description?: string | null;

  /** Valor do QR Code */
  value?: number | null;

  /** Data de expiração */
  expirationDate?: string | null;

  /** Permite alterar o valor após criação */
  allowsMultipleUse?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

