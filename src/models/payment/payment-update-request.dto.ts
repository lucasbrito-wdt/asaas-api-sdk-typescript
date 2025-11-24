/**
 * DTO para atualização de pagamento
 */
export interface PaymentUpdateRequestDto {
  /** Valor do pagamento */
  value?: number | null;

  /** Data de vencimento */
  dueDate?: string | null;

  /** Descrição */
  description?: string | null;

  /** Referência externa */
  externalReference?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

