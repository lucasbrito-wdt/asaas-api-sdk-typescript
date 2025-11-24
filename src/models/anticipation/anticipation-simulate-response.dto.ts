/**
 * DTO de resposta para simulação de antecipação
 */
export interface AnticipationSimulateResponseDto {
  /** Identificador único da parcela a ser antecipada */
  installment?: string | null;

  /** Identificador único do pagamento a ser antecipado */
  payment?: string | null;

  /** Data de requisição da antecipação */
  anticipationDate?: string | null;

  /** Data de vencimento da requisição */
  dueDate?: string | null;

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

  /** Determina a obrigatoriedade de envio de notas fiscais eletrônicas */
  isDocumentationRequired?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

