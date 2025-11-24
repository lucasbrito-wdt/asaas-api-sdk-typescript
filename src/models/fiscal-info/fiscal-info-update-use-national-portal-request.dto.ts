/**
 * DTO para atualização do uso do portal nacional
 */
export interface FiscalInfoUpdateUseNationalPortalRequestDto {
  /** Usar portal nacional */
  useNationalPortal?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

