/**
 * DTO de resposta para decodificação de QR Code PIX
 */
export interface PixQrCodeDecodeResponseDto {
  /** Copia e Cola do QR Code */
  payload?: string | null;

  /** Tipo do QR Code */
  type?: string | null;

  /** Origem da transação */
  transactionOriginType?: string | null;

  /** Chave PIX usada */
  pixKey?: string | null;

  /** Identificador único de conciliação PIX com Asaas */
  conciliationIdentifier?: string | null;

  /** Data de vencimento */
  dueDate?: string | null;

  /** Data de expiração */
  expirationDate?: string | null;

  /** Indica se é Saque ou Troco */
  finality?: string | null;

  /** Valor do QR Code */
  value?: number | null;

  /** Valor do troco */
  changeValue?: number | null;

  /** Valor de juros */
  interest?: number | null;

  /** Valor de multa */
  fine?: number | null;

  /** Valor de desconto */
  discount?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

