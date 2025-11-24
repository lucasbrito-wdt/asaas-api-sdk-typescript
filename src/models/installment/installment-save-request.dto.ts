/**
 * DTO para criação de parcela
 */
export interface InstallmentSaveRequestDto {
  /** Número de parcelas */
  installmentCount: number;

  /** Identificador único do cliente no Asaas */
  customer: string;

  /** Valor de cada parcela */
  value: number;

  /** Tipo de cobrança do pagamento */
  billingType: string;

  /** Data de vencimento da primeira parcela */
  dueDate: string;

  /** Valor total da parcela */
  totalValue?: number | null;

  /** Descrição da parcela (máx. 500 caracteres) */
  description?: string | null;

  /** Define se o pagamento será enviado via correios */
  postalService?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

