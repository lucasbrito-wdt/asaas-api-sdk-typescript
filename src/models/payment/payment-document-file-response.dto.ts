/**
 * DTO de resposta para informações de arquivo de documento
 */
export interface PaymentDocumentFileResponseDto {
  /** Identificador único do documento */
  publicId?: string | null;

  /** Nome original do documento */
  originalName?: string | null;

  /** Tamanho do arquivo */
  size?: number | null;

  /** Extensão do arquivo */
  extension?: string | null;

  /** Link para visualizar o arquivo */
  previewUrl?: string | null;

  /** Link para baixar o arquivo */
  downloadUrl?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

