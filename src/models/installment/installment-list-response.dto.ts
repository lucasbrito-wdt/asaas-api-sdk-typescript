import { InstallmentGetResponseDto } from "./installment-get-response.dto";

/**
 * DTO de resposta para listagem de parcelas
 */
export interface InstallmentListResponseDto {
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

  /** Lista de parcelas */
  data?: InstallmentGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

