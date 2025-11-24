/**
 * DTO de resposta para obtenção de antecipação
 */
export interface AnticipationGetResponseDto {
  /** Tipo do objeto */
  object?: string | null;

  /** Identificador único da antecipação no Asaas */
  id?: string | null;

  /** Identificador único da parcela a ser antecipada */
  installment?: string | null;

  /** Identificador único do pagamento a ser antecipado */
  payment?: string | null;

  /** Status da antecipação */
  status?: string | null;

  /** Data da antecipação */
  anticipationDate?: string | null;

  /** Data de vencimento da requisição */
  dueDate?: string | null;

  /** Data de requisição da antecipação */
  requestDate?: string | null;

  /** Taxa de antecipação */
  fee?: number | null;

  /** Número de dias que foram antecipados */
  anticipationDays?: number | null;

  /** Valor líquido descontada a taxa de antecipação */
  netValue?: number | null;

  /** Valor total do pagamento a ser antecipado */
  totalValue?: number | null;

  /** Valor da antecipação */
  value?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

