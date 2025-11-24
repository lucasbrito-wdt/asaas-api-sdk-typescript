/**
 * DTO para solicitação de recarga de celular
 */
export interface MobilePhoneRechargeSaveRequestDto {
  /** Número do celular */
  phone: string;

  /** Valor da recarga */
  value: number;

  /** Informações adicionais */
  [key: string]: any;
}

