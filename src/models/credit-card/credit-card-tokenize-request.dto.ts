/**
 * DTO para tokenização de cartão de crédito
 */
export interface CreditCardTokenizeRequestDto {
  /** Identificador único do cliente no Asaas */
  customer: string;

  /** Informações do cartão de crédito */
  creditCard: any;

  /** Informações do portador do cartão */
  creditCardHolderInfo: any;

  /** IP de onde o cliente está fazendo a compra */
  remoteIp: string;

  /** Informações adicionais */
  [key: string]: any;
}

