import { PaymentDocumentFileResponseDto } from "./payment-document-file-response.dto";

/**
 * DTO de resposta para obtenção de documento de pagamento
 */
export interface PaymentDocumentGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único do documento */
  id?: string | null;

  /** Nome do documento */
  name?: string | null;

  /** Tipo do documento */
  type?: string | null;

  /** Disponível apenas após pagamento */
  availableAfterPayment?: boolean | null;

  /** Objeto de arquivo */
  file?: PaymentDocumentFileResponseDto | null;

  /** Indica se o arquivo foi removido */
  deleted?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

