/**
 * DTO de resposta para obtenção de transação PIX
 */
export interface PixTransactionGetResponseDto {
  /** Identificador único da transação PIX no Asaas */
  id?: string | null;

  /** Identificador da transação PIX no Banco Central */
  endToEndIdentifier?: string | null;

  /** Indica se é Saque ou Troco */
  finality?: string | null;

  /** Valor da transação ou saque */
  value?: number | null;

  /** Valor do troco */
  changeValue?: number | null;

  /** Valor estornado */
  refundedValue?: number | null;

  /** Data efetiva da transação */
  effectiveDate?: string | null;

  /** Data agendada */
  scheduledDate?: string | null;

  /** Status da transação */
  status?: string | null;

  /** Tipo de transação */
  type?: string | null;

  /** Indica a origem da transação */
  originType?: string | null;

  /** Identificador de conciliação do QR Code */
  conciliationIdentifier?: string | null;

  /** Descrição sobre a transação */
  description?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

