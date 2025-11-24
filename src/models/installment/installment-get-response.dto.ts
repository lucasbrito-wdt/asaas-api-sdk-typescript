/**
 * DTO de resposta para obtenção de parcela
 */
export interface InstallmentGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único da parcela no Asaas */
  id?: string | null;

  /** Valor da parcela */
  value?: number | null;

  /** Valor líquido da parcela */
  netValue?: number | null;

  /** Valor de cada parcela */
  paymentValue?: number | null;

  /** Número de parcelas */
  installmentCount?: number | null;

  /** Forma de pagamento */
  billingType?: string | null;

  /** Data de liquidação do boleto no Asaas */
  paymentDate?: string | null;

  /** Descrição da parcela */
  description?: string | null;

  /** Data de vencimento de cada parcela */
  expirationDay?: number | null;

  /** Data de criação da parcela */
  dateCreated?: string | null;

  /** Identificador único do cliente */
  customer?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

