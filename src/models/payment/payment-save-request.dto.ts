/**
 * DTO para criação de pagamento
 */
export interface PaymentSaveRequestDto {
  /** Identificador único do cliente no Asaas */
  customer: string;

  /** Tipo de cobrança do pagamento */
  billingType: string;

  /** Valor do pagamento */
  value: number;

  /** Data de vencimento do pagamento */
  dueDate: string;

  /** Descrição do pagamento (máx. 500 caracteres) */
  description?: string | null;

  /** Dias após vencimento para cancelamento do registro (apenas para boleto) */
  daysAfterDueDateToRegistrationCancellation?: number | null;

  /** Campo de busca livre */
  externalReference?: string | null;

  /** Número de parcelas (apenas no caso de pagamento parcelado) */
  installmentCount?: number | null;

  /** Valor total de uma cobrança que será paga em parcelas */
  totalValue?: number | null;

  /** Valor de cada parcela */
  installmentValue?: number | null;

  /** Informações de desconto */
  discount?: any | null;

  /** Informações de juros para pagamento após vencimento */
  interest?: any | null;

  /** Informações de multa para pagamento após vencimento */
  fine?: any | null;

  /** Define se o pagamento será enviado via correios */
  postalService?: boolean | null;

  /** Configurações de split */
  split?: any[] | null;

  /** Informações de redirecionamento automático após pagamento */
  callback?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

