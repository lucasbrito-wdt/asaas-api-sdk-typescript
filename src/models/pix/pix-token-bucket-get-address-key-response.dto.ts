/**
 * DTO de resposta para verificação de token bucket disponível
 */
export interface PixTokenBucketGetAddressKeyResponseDto {
  /** Indica se há tokens disponíveis */
  available?: boolean;

  /** Quantidade de tokens disponíveis */
  tokensAvailable?: number;

  /** Informações adicionais */
  [key: string]: any;
}

