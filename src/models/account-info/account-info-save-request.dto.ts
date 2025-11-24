/**
 * DTO para criação/atualização de informações da conta
 */
export interface AccountInfoSaveRequestDto {
  /** Tipo de pessoa */
  personType?: string | null;

  /** CPF ou CNPJ do titular da conta */
  cpfCnpj?: string | null;

  /** Data de nascimento (obrigatório se pessoa física) */
  birthDate?: string | null;

  /** Tipo de empresa (apenas para pessoa jurídica) */
  companyType?: string | null;

  /** Nome da empresa */
  companyName?: string | null;

  /** Faturamento/Renda mensal */
  incomeValue?: number | null;

  /** Email da conta */
  email?: string | null;

  /** Telefone */
  phone?: string | null;

  /** Celular */
  mobilePhone?: string | null;

  /** Site */
  site?: string | null;

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

