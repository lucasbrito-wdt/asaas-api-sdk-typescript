import { PixRecurringTransactionGetItemResponseDto } from "./pix-recurring-transaction-get-item-response.dto";

/**
 * DTO de resposta para listagem de itens de recorrência PIX
 */
export interface RecurringPixTransactionListItemsResponseDto {
  /** Lista de itens */
  data?: PixRecurringTransactionGetItemResponseDto[];

  /** Informações adicionais */
  [key: string]: any;
}

