/**
 * DTO de resposta para obtenção de informações da conta
 */
export interface AccountInfoGetResponseDto {
  /** Status da conta */
  status?: string | null;

  /** Tipo de pessoa */
  personType?: string | null;

  /** CPF ou CNPJ do titular da conta */
  cpfCnpj?: string | null;

  /** Nome do titular da conta */
  name?: string | null;

  /** Data de nascimento */
  birthDate?: string | null;

  /** Nome da empresa */
  companyName?: string | null;

  /** Tipo de empresa */
  companyType?: string | null;

  /** Faturamento/Renda mensal */
  incomeValue?: number | null;

  /** Email da conta */
  email?: string | null;

  /** Telefone */
  phone?: string | null;

  /** Celular */
  mobilePhone?: string | null;

  /** CEP */
  postalCode?: string | null;

  /** Logradouro */
  address?: string | null;

  /** Número do endereço */
  addressNumber?: string | null;

  /** Complemento */
  complement?: string | null;

  /** Bairro */
  province?: string | null;

  /** Cidade */
  city?: string | null;

  /** Estado */
  state?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

