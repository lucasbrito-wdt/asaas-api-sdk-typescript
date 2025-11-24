import { CustomerGetResponseDto } from "./customer-get-response.dto";

/**
 * DTO de resposta para listagem de clientes
 */
export interface CustomerListResponseDto {
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

  /** Lista de clientes */
  data?: CustomerGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

