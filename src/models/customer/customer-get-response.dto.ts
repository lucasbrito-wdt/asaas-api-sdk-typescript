/**
 * DTO de resposta para obtenção de cliente
 */
export interface CustomerGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único do cliente */
  id?: string | null;

  /** Data de criação do cliente */
  dateCreated?: string | null;

  /** Nome do cliente */
  name?: string | null;

  /** Email do cliente */
  email?: string | null;

  /** Telefone do cliente */
  phone?: string | null;

  /** Celular do cliente */
  mobilePhone?: string | null;

  /** Endereço do cliente */
  address?: string | null;

  /** Número do endereço */
  addressNumber?: string | null;

  /** Complemento do endereço */
  complement?: string | null;

  /** Bairro do endereço */
  province?: string | null;

  /** Identificador único da cidade no Asaas */
  city?: number | null;

  /** Nome da cidade */
  cityName?: string | null;

  /** Estado */
  state?: string | null;

  /** CEP */
  postalCode?: string | null;

  /** CPF ou CNPJ */
  cpfCnpj?: string | null;

  /** Referência externa */
  externalReference?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

