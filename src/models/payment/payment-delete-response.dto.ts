/**
 * DTO de resposta para exclusão de pagamento
 */
export interface PaymentDeleteResponseDto {
  /** Indica se foi deletado */
  deleted?: boolean | null;

  /** Identificador único do pagamento */
  id?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

