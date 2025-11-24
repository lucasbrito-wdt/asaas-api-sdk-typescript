/**
 * DTO de resposta para exclusão de documento de pagamento
 */
export interface PaymentDocumentDeleteResponseDto {
  /** Indica se o arquivo foi removido */
  deleted?: boolean | null;

  /** Identificador único do documento */
  id?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

