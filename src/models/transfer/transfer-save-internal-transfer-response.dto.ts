/**
 * DTO de resposta para criação de transferência interna
 */
export interface TransferSaveInternalTransferResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único da transferência no Asaas */
  id?: string | null;

  /** Tipo de transferência */
  type?: string | null;

  /** Data de criação da requisição */
  dateCreated?: string | null;

  /** Valor da transferência */
  value?: number | null;

  /** Valor líquido menos taxa de transferência */
  netValue?: number | null;

  /** Status da transferência */
  status?: string | null;

  /** Taxa de transferência */
  transferFee?: number | null;

  /** Data efetiva */
  effectiveDate?: string | null;

  /** Data agendada */
  scheduleDate?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

