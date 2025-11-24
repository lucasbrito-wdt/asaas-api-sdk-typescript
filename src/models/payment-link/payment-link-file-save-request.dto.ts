/**
 * DTO para criação de imagem de link de pagamento
 */
export interface PaymentLinkFileSaveRequestDto {
  /** true para definir como imagem principal */
  main?: boolean | null;

  /** Arquivo de imagem */
  image: Buffer | ArrayBuffer | Uint8Array;
}

