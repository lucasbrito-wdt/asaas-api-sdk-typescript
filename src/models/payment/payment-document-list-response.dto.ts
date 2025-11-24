import { PaymentDocumentGetResponseDto } from "./payment-document-get-response.dto";

/**
 * DTO de resposta para listagem de documentos de pagamento
 */
export interface PaymentDocumentListResponseDto {
  /** Tipo do objeto */
  object?: string;

  /** Indica se há mais páginas */
  hasMore?: boolean;

  /** Total de itens */
  totalCount?: number;

  /** Limite de itens por página */
  limit?: number;

  /** Offset da página */
  offset?: number;

  /** Lista de documentos */
  data?: PaymentDocumentGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

