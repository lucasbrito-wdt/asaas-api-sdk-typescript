/**
 * DTO de resposta para obtenção de recarga de celular
 */
export interface MobilePhoneRechargeGetResponseDto {
  /** Identificador único da recarga */
  id?: string | null;

  /** Número do celular */
  phone?: string | null;

  /** Valor da recarga */
  value?: number | null;

  /** Status */
  status?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

