import { AnticipationGetResponseDto } from "./anticipation-get-response.dto";

/**
 * DTO de resposta para listagem de antecipações
 */
export interface AnticipationListResponseDto {
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

  /** Lista de antecipações */
  data?: AnticipationGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

