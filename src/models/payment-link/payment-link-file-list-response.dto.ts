import { PaymentLinkFileGetResponseDto } from "./payment-link-file-get-response.dto";

/**
 * DTO de resposta para listagem de imagens de link de pagamento
 */
export interface PaymentLinkFileListResponseDto {
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

  /** Lista de imagens */
  data?: PaymentLinkFileGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

