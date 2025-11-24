/**
 * DTO de resposta para obtenção de split de pagamento
 */
export interface PaymentSplitGetResponseDto {
  /** Identificador único do split no Asaas */
  id?: string | null;

  /** Identificador da carteira Asaas que será transferida */
  walletId?: string | null;

  /** Valor fixo a ser transferido quando a cobrança for recebida */
  fixedValue?: number | null;

  /** Percentual do valor líquido a ser transferido quando recebido */
  percentualValue?: number | null;

  /** Valor total que será dividido */
  totalValue?: number | null;

  /** Motivo do cancelamento do split */
  cancellationReason?: string | null;

  /** Status do split */
  status?: string | null;

  /** Identificador único do split no seu sistema */
  externalReference?: string | null;

  /** Descrição do split */
  description?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

