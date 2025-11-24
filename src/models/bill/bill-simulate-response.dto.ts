/**
 * DTO de resposta para simulação de conta a pagar
 */
export interface BillSimulateResponseDto {
  /** Valor total */
  totalValue?: number | null;

  /** Valor líquido */
  netValue?: number | null;

  /** Taxas */
  fees?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

