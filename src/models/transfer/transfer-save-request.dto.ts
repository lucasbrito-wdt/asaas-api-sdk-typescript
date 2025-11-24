/**
 * DTO para criação de transferência
 */
export interface TransferSaveRequestDto {
  /** Valor a ser transferido */
  value: number;

  /** Detalhes da conta bancária (se for transferência para conta bancária) */
  bankAccount?: any | null;

  /** Modalidade de transferência */
  operationType?: string | null;

  /** Chave PIX (se for transferência para chave PIX) */
  pixAddressKey?: string | null;

  /** Tipo de chave PIX */
  pixAddressKeyType?: string | null;

  /** Descrição (permitida em transferências via PIX) */
  description?: string | null;

  /** Data agendada (se não informado, pagamento é instantâneo) */
  scheduleDate?: string | null;

  /** Identificador da transferência no seu sistema */
  externalReference?: string | null;

  /** Informações de recorrência (apenas para transferências PIX) */
  recurring?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

