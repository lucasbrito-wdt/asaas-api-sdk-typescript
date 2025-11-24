import { MobilePhoneRechargeGetResponseDto } from "./mobile-phone-recharge-get-response.dto";

/**
 * DTO de resposta para listagem de recargas de celular
 */
export interface MobilePhoneRechargeListResponseDto {
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

  /** Lista de recargas */
  data?: MobilePhoneRechargeGetResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

