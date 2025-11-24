/**
 * DTO para atualização de cliente
 */
export interface CustomerUpdateRequestDto {
  /** Nome do cliente */
  name?: string | null;

  /** Email do cliente */
  email?: string | null;

  /** Telefone fixo */
  phone?: string | null;

  /** Celular */
  mobilePhone?: string | null;

  /** Logradouro */
  address?: string | null;

  /** Número do endereço */
  addressNumber?: string | null;

  /** Complemento do endereço */
  complement?: string | null;

  /** Bairro */
  province?: string | null;

  /** CEP do endereço */
  postalCode?: string | null;

  /** Referência externa */
  externalReference?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

