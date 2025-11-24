/**
 * DTO para criação de fatura
 */
export interface InvoiceSaveRequestDto {
  /** Descrição dos serviços da fatura */
  serviceDescription: string;

  /** Observações adicionais */
  observations: string;

  /** Valor total */
  value: number;

  /** Deduções */
  deductions: number;

  /** Data de emissão da fatura */
  effectiveDate: string;

  /** Nome do serviço municipal */
  municipalServiceName: string;

  /** Impostos da fatura */
  taxes?: any | null;

  /** Identificador único do pagamento no Asaas */
  payment?: string | null;

  /** Identificador único da parcela no Asaas */
  installment?: string | null;

  /** Identificador único do cliente */
  customer?: string | null;

  /** Identificador da fatura no seu sistema */
  externalReference?: string | null;

  /** Identificador único do serviço municipal */
  municipalServiceId?: string | null;

  /** Código do Serviço Municipal */
  municipalServiceCode?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

