/**
 * DTO de resposta para exclusão de imagem de link de pagamento
 */
export interface PaymentLinkFileDeleteResponseDto {
  /** Indica se foi removido */
  deleted?: boolean | null;

  /** Identificador único da imagem */
  id?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

