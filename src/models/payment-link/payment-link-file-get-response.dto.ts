/**
 * DTO de resposta para obtenção de imagem de link de pagamento
 */
export interface PaymentLinkFileGetResponseDto {
  /** Identificador único da imagem */
  id?: string | null;

  /** Se é a imagem principal */
  main?: boolean | null;

  /** Informações da imagem */
  image?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

