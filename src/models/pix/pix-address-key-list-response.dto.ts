import { PixAddressKeyGetResponseDto } from "./pix-address-key-get-response.dto";

/**
 * DTO de resposta para listagem de chaves PIX
 */
export interface PixAddressKeyListResponseDto {
  /** Lista de chaves PIX */
  data?: PixAddressKeyGetResponseDto[];

  /** Total de registros */
  totalCount?: number;

  /** Informações de paginação */
  hasMore?: boolean;

  /** Informações adicionais */
  [key: string]: any;
}

