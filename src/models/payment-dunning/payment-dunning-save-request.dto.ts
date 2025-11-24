/**
 * DTO para criação de cobrança de inadimplência
 */
export interface PaymentDunningSaveRequestDto {
  /** Identificador único do pagamento a ser recuperado no Asaas */
  payment: string;

  /** Tipo de cobrança de inadimplência */
  type: string;

  /** Nome do cliente */
  customerName: string;

  /** CPF ou CNPJ do cliente */
  customerCpfCnpj: string;

  /** Telefone principal do cliente */
  customerPrimaryPhone: string;

  /** CEP do endereço do cliente */
  customerPostalCode: string;

  /** Endereço público do cliente */
  customerAddress: string;

  /** Número do endereço do cliente */
  customerAddressNumber: string;

  /** Bairro do cliente */
  customerProvince: string;

  /** Descrição do produto ou serviço fornecido */
  description?: string | null;

  /** Telefone secundário do cliente */
  customerSecondaryPhone?: string | null;

  /** Complemento do endereço do cliente */
  customerComplement?: string | null;

  /** Fatura e/ou contrato autenticado (arquivo) */
  documents?: Buffer | ArrayBuffer | Uint8Array | null;

  /** Informações adicionais */
  [key: string]: any;
}

