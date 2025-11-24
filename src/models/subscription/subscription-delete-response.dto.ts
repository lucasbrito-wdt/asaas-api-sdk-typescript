/**
 * DTO de resposta para exclusão de assinatura
 */
export interface SubscriptionDeleteResponseDto {
  /** Indica se foi deletado */
  deleted?: boolean | null;

  /** Identificador único da assinatura */
  id?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

