/**
 * DTO de resposta para envio de documentos de cobrança
 */
export interface PaymentDunningSaveDocumentsResponseDto {
  /** Status */
  status?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

