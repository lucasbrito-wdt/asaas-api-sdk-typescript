/**
 * DTO de resposta para obtenção de subconta
 */
export interface AccountGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único da subconta no Asaas */
  id?: string | null;

  /** Nome da subconta */
  name?: string | null;

  /** Email da subconta */
  email?: string | null;

  /** Email para login */
  loginEmail?: string | null;

  /** Telefone */
  phone?: string | null;

  /** Celular */
  mobilePhone?: string | null;

  /** Logradouro */
  address?: string | null;

  /** Número do endereço */
  addressNumber?: string | null;

  /** Complemento */
  complement?: string | null;

  /** Bairro */
  province?: string | null;

  /** CEP */
  postalCode?: string | null;

  /** CPF ou CNPJ */
  cpfCnpj?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

