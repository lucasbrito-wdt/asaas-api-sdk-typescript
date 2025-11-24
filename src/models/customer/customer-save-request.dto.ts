/**
 * DTO para criação de cliente
 */
export interface CustomerSaveRequestDto {
  /** Nome do cliente */
  name: string;

  /** CPF ou CNPJ do cliente */
  cpfCnpj: string;

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

  /** Complemento do endereço (máx. 255 caracteres) */
  complement?: string | null;

  /** Bairro */
  province?: string | null;

  /** CEP do endereço */
  postalCode?: string | null;

  /** Identificador do cliente no seu sistema */
  externalReference?: string | null;

  /** true para desabilitar envio de notificações de cobrança */
  notificationDisabled?: boolean | null;

  /** Emails adicionais para envio de notificações de cobrança separados por "," */
  additionalEmails?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

