/**
 * DTO de resposta para exclusão de link de pagamento
 */
export interface PaymentLinkDeleteResponseDto {
  /** Indica se foi removido */
  deleted?: boolean | null;

  /** Identificador único do link */
  id?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

