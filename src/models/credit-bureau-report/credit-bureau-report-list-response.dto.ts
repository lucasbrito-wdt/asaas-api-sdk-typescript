import { CreditBureauReportGetResponseDto } from "./credit-bureau-report-get-response.dto";

/**
 * DTO de resposta para listagem de relatórios de crédito
 */
export interface CreditBureauReportListResponseDto {
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

  /** Lista de relatórios */
  data?: CreditBureauReportGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

