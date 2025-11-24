/**
 * DTO de resposta para busca de provedor
 */
export interface MobilePhoneRechargeFindProviderResponseDto {
  /** Provedor encontrado */
  provider?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

