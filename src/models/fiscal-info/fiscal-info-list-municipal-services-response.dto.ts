/**
 * DTO de resposta para listagem de serviços municipais
 */
export interface FiscalInfoListMunicipalServicesResponseDto {
  /** Lista de serviços */
  data?: any[] | null;

  /** Informações adicionais */
  [key: string]: any;
}

