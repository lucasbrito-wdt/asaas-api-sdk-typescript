/**
 * DTO de resposta para obtenção de informações fiscais
 */
export interface FiscalInfoGetResponseDto {
  /** Identificador único */
  id?: string | null;

  /** Informações fiscais */
  [key: string]: any;
}

