/**
 * DTO para atualização de fatura
 */
export interface InvoiceUpdateRequestDto {
  /** Descrição dos serviços da fatura */
  serviceDescription?: string | null;

  /** Observações adicionais */
  observations?: string | null;

  /** Valor total */
  value?: number | null;

  /** Deduções */
  deductions?: number | null;

  /** Data de emissão da fatura */
  effectiveDate?: string | null;

  /** Nome do serviço municipal */
  municipalServiceName?: string | null;

  /** Impostos da fatura */
  taxes?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

