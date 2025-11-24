/**
 * DTO de resposta para obtenção de cobrança de inadimplência
 */
export interface PaymentDunningShowResponseDto {
  /** Identificador único da cobrança no Asaas */
  id?: string | null;

  /** Número da cobrança */
  dunningNumber?: number | null;

  /** Status da cobrança */
  status?: string | null;

  /** Tipo de cobrança */
  type?: string | null;

  /** Data da requisição */
  requestDate?: string | null;

  /** Descrição da cobrança */
  description?: string | null;

  /** Valor do pagamento */
  value?: number | null;

  /** Custo e/ou taxa da cobrança */
  feeValue?: number | null;

  /** Valor líquido a ser recuperado */
  netValue?: number | null;

  /** Taxa de recebimento em dinheiro */
  receivedInCashFeeValue?: number | null;

  /** Motivo da negação da cobrança */
  denialReason?: string | null;

  /** Taxa cobrada em caso de cancelamento */
  cancellationFeeValue?: number | null;

  /** Se a cobrança pode ser cancelada */
  canBeCancelled?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

