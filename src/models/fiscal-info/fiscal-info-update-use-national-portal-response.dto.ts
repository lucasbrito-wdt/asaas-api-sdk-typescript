/**
 * DTO de resposta para atualização do uso do portal nacional
 */
export interface FiscalInfoUpdateUseNationalPortalResponseDto {
  /** Usar portal nacional */
  useNationalPortal?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

