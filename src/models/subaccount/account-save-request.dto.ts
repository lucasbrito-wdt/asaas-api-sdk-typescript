/**
 * DTO para criação de subconta
 */
export interface AccountSaveRequestDto {
  /** Nome da subconta */
  name: string;

  /** Email da subconta */
  email: string;

  /** CPF ou CNPJ do titular da subconta */
  cpfCnpj: string;

  /** Celular */
  mobilePhone: string;

  /** Faturamento/Renda mensal */
  incomeValue: number;

  /** Logradouro */
  address: string;

  /** Número do endereço */
  addressNumber: string;

  /** Bairro */
  province: string;

  /** CEP */
  postalCode: string;

  /** Email para login da subconta */
  loginEmail?: string | null;

  /** Data de nascimento (apenas para pessoa física) */
  birthDate?: string | null;

  /** Tipo de empresa (apenas para pessoa jurídica) */
  companyType?: string | null;

  /** Telefone */
  phone?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

