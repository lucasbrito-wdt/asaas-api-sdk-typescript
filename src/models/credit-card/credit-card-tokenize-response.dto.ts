/**
 * DTO de resposta para tokenização de cartão de crédito
 */
export interface CreditCardTokenizeResponseDto {
  /** Últimos 4 dígitos do cartão usado */
  creditCardNumber?: string | null;

  /** Bandeira do cartão usado */
  creditCardBrand?: string | null;

  /** Token do cartão de crédito que pode ser enviado em transações futuras */
  creditCardToken?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

