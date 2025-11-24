/**
 * DTO de resposta para obtenção de fatura
 */
export interface InvoiceGetResponseDto {
  /** Identificador único da fatura */
  id?: string | null;

  /** Descrição dos serviços */
  serviceDescription?: string | null;

  /** Observações */
  observations?: string | null;

  /** Valor total */
  value?: number | null;

  /** Deduções */
  deductions?: number | null;

  /** Data de emissão */
  effectiveDate?: string | null;

  /** Status da fatura */
  status?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

